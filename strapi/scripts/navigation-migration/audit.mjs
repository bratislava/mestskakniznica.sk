/**
 * Phase 0 of the Navikronos -> parentPage migration: reports everything in the data that the migration or the
 * content team has to deal with. Read-only.
 *
 * Usage (from strapi/): node --env-file=.env.local scripts/navigation-migration/audit.mjs
 */
import { loadNavikronos, loadPageLocalizations, loadPages, withDb } from './lib/db.mjs'
import {
  flattenNavikronos,
  getAncestors,
  getContentTypeAlias,
  groupBy,
  LOCALE_PREFIX,
} from './lib/navikronos.mjs'

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const section = (title, lines) => {
  console.log(`\n--- ${title}`)
  console.log(lines.length > 0 ? lines.map((line) => `  ${line}`).join('\n') : '  none')
}

await withDb(async (client) => {
  const navikronos = await loadNavikronos(client)
  const pages = await loadPages(client)
  const localizations = await loadPageLocalizations(client)

  const treeByLocale = Object.fromEntries(
    Object.entries(navikronos).map(([locale, routes]) => [locale, flattenNavikronos(routes, pages)])
  )
  const treePageIds = new Map(
    Object.entries(treeByLocale).map(([locale, nodes]) => [
      locale,
      new Map(nodes.filter((node) => node.type === 'entry').map((node) => [node.route.entryId, node])),
    ])
  )

  for (const [locale, nodes] of Object.entries(treeByLocale)) {
    const entries = nodes.filter((node) => node.type === 'entry')
    const counts = groupBy(nodes, (node) => node.type)
    console.log(
      `\n========== ${locale}: ${nodes.length} nodes (${Object.entries(counts)
        .map(([type, list]) => `${type} ${list.length}`)
        .join(', ')}), max depth ${Math.max(...nodes.map((node) => getAncestors(node).length + 1))}`
    )

    section(
      'detail page slots',
      nodes
        .filter((node) => node.type === 'contentType')
        .map(
          (node) =>
            `${getContentTypeAlias(node.route.contentTypeUid).padEnd(11)} ${LOCALE_PREFIX[locale]}${node.parent?.path ?? ''}/:slug  (parent: ${node.parent ? `${node.parent.type}${node.parent.page ? ` #${node.parent.page.id}` : ''}` : 'root'})`
        )
    )

    section(
      'empty / static / listing nodes',
      nodes
        .filter((node) => ['empty', 'static', 'listing'].includes(node.type))
        .map(
          (node) =>
            `${node.type.padEnd(7)} ${node.path}  children: [${(node.route.children ?? []).map((child) => child.type).join(', ')}]`
        )
    )

    section(
      'entries with problems (missing page, other locale, draft, overrides)',
      entries.flatMap((node) => {
        const { page, route } = node
        const issues = []
        if (!page) issues.push('PAGE MISSING')
        if (page && page.locale !== locale) issues.push(`page locale is ${page.locale}`)
        if (page && !page.published) {
          const hidden = nodes.filter((other) => getAncestors(other).includes(node)).length
          issues.push(`draft, hides ${hidden} descendant nodes on the live site`)
        }
        if (route.overridePath) issues.push(`overridePath ${JSON.stringify(route.overridePath)}`)
        if (route.overrideTitle) issues.push(`overrideTitle ${JSON.stringify(route.overrideTitle)}`)

        return issues.length > 0 ? [`#${route.entryId} ${node.path}: ${issues.join('; ')}`] : []
      })
    )

    section(
      'entries under a non-page node (the migration cannot keep their URL segment)',
      entries
        .filter((node) => node.parent && node.parent.type !== 'entry')
        .map((node) => `#${node.route.entryId} ${node.path} (parent is ${node.parent.type})`)
    )

    const placements = groupBy(entries, (node) => node.route.entryId)
    section(
      'pages placed in the tree more than once',
      Object.entries(placements)
        .filter(([, list]) => list.length > 1)
        .map(([id, list]) => `#${id}: ${list.map((node) => node.path).join(', ')}`)
    )

    const siblingGroups = groupBy(
      nodes.filter((node) => node.type !== 'contentType'),
      (node) => node.parent?.path ?? '/'
    )
    section(
      'sibling segment collisions',
      Object.entries(siblingGroups).flatMap(([parentPath, siblings]) =>
        Object.entries(groupBy(siblings, (node) => node.segment))
          .filter(([, list]) => list.length > 1)
          .map(([segment]) => `${parentPath}: "${segment}"`)
      )
    )

    section(
      'legacy `slug` differs from the real path (drafts included)',
      entries
        .filter((node) => node.page && node.page.slug !== node.path.slice(1))
        .map((node) => `#${node.page.id} slug "${node.page.slug}", real "${node.path.slice(1)}"`)
    )
  }

  const otherLocale = (locale) => Object.keys(navikronos).find((other) => other !== locale)
  const findLocalizationInTree = (page, locale) =>
    [...(localizations.get(page.id) ?? [])]
      .map((id) => pages.get(id))
      .find((localization) => localization?.locale === locale)

  for (const locale of Object.keys(navikronos)) {
    section(
      `[${locale}] pages NOT in the tree (published ones become top-level URLs after the switch)`,
      [...pages.values()]
        .filter((page) => page.locale === locale && !treePageIds.get(locale).has(page.id))
        .map((page) => {
          const localization = findLocalizationInTree(page, otherLocale(locale))
          const localizationNode = localization && treePageIds.get(otherLocale(locale)).get(localization.id)
          const hint = localizationNode
            ? `, its ${otherLocale(locale)} version #${localization.id} is in the tree at ${localizationNode.path}`
            : ''

          return `#${page.id} ${page.published ? 'published' : 'draft    '} updated ${page.updatedAt.toISOString().slice(0, 10)} newSlug ${JSON.stringify(page.newSlug)} slug ${JSON.stringify(page.slug)}${hint}`
        })
    )
  }

  section(
    'newSlug used by more than one page within a locale (drafts included)',
    Object.entries(groupBy([...pages.values()], (page) => `${page.locale} "${page.newSlug}"`))
      .filter(([, list]) => list.length > 1)
      .map(
        ([key, list]) =>
          `${key}: ${list
            .map(
              (page) =>
                `#${page.id}${page.published ? '' : ' (draft)'}${treePageIds.get(page.locale)?.has(page.id) ? '' : ' (not in tree)'}`
            )
            .join(', ')}`
      )
  )

  section(
    'newSlug that is not lowercase-kebab-case',
    [...pages.values()]
      .filter((page) => !SLUG_REGEX.test(page.newSlug ?? ''))
      .map((page) => `#${page.id} (${page.locale}, ${page.published ? 'published' : 'draft'}): ${JSON.stringify(page.newSlug)}`)
  )

  section(
    'tree pages whose translation is missing or not in the other tree (language switcher falls back)',
    [...treePageIds.entries()].flatMap(([locale, ids]) =>
      [...ids.values()].flatMap((node) => {
        if (!node.page) return []
        const other = otherLocale(locale)
        const localization = findLocalizationInTree(node.page, other)
        if (!localization) return [`[${locale}] #${node.page.id} ${node.path}: no ${other} version`]
        if (!treePageIds.get(other).has(localization.id)) {
          return [`[${locale}] #${node.page.id} ${node.path}: ${other} version #${localization.id} is not in the ${other} tree`]
        }

        return []
      })
    )
  )
})
