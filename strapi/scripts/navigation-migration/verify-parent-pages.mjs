/**
 * Phase 1 of the Navikronos -> parentPage migration: checks that page.parentPage + newSlug describe exactly the same
 * tree as Navikronos - same parent, same position among siblings, same full path (also compared with the legacy
 * `slug`, which holds the full path). Run it after database/manual-migrations/navikronos-to-parent-page.sql.
 * Read-only. Exit code 1 when anything differs.
 *
 * Usage (from strapi/): node --env-file=.env.local scripts/navigation-migration/verify-parent-pages.mjs
 */
import { loadNavikronos, loadPages, loadParentLinks, withDb } from './lib/db.mjs'
import { flattenNavikronos, groupBy } from './lib/navikronos.mjs'

const problems = []

await withDb(async (client) => {
  const navikronos = await loadNavikronos(client)
  const pages = await loadPages(client)
  const links = await loadParentLinks(client)

  Object.entries(groupBy(links, (link) => link.pageId))
    .filter(([, list]) => list.length > 1)
    .forEach(([pageId, list]) => problems.push(`#${pageId} has ${list.length} parentPage rows`))

  const parentOf = new Map(links.map((link) => [link.pageId, link.parentId]))
  const getPathFromParentPage = (pageId) => {
    const segments = []
    const visited = new Set()
    for (let id = pageId; id != null; id = parentOf.get(id)) {
      if (visited.has(id)) return `<cycle at #${id}>`
      visited.add(id)
      segments.unshift(pages.get(id)?.newSlug ?? `<missing page #${id}>`)
    }

    return `/${segments.join('/')}`
  }
  const getChildrenFromParentPage = (parentId) =>
    links
      .filter((link) => link.parentId === parentId)
      .sort((a, b) => a.order - b.order)
      .map((link) => link.pageId)

  const pagesInTree = new Set()

  for (const [locale, routes] of Object.entries(navikronos)) {
    const entries = flattenNavikronos(routes, pages).filter((node) => node.type === 'entry')

    entries.forEach((node) => {
      const id = node.route.entryId
      pagesInTree.add(id)

      if (node.parent && node.parent.type !== 'entry') {
        problems.push(
          `[${locale}] #${id} ${node.path}: parent is a ${node.parent.type} node, not a page`
        )
      }
      const expectedParent = node.parent?.type === 'entry' ? node.parent.route.entryId : null
      const actualParent = parentOf.get(id) ?? null
      if (actualParent !== expectedParent) {
        problems.push(
          `[${locale}] #${id} ${node.path}: parentPage is #${actualParent}, expected #${expectedParent}`
        )
      }

      const path = getPathFromParentPage(id)
      if (path !== node.path) {
        problems.push(
          `[${locale}] #${id}: path from parentPage is ${path}, Navikronos has ${node.path}`
        )
      }
      if (node.page && node.page.slug !== path.slice(1)) {
        problems.push(
          `[${locale}] #${id}: path from parentPage is ${path}, legacy slug is /${node.page.slug}`
        )
      }

      const expectedChildren = entries
        .filter((child) => child.parent === node)
        .map((child) => child.route.entryId)
      const actualChildren = getChildrenFromParentPage(id)
      if (expectedChildren.join() !== actualChildren.join()) {
        problems.push(
          `[${locale}] #${id} ${node.path}: childPages order [${actualChildren}], Navikronos has [${expectedChildren}]`
        )
      }
    })

    console.log(`${locale}: checked ${entries.length} pages`)
  }

  links
    .filter((link) => !pagesInTree.has(link.pageId))
    .forEach((link) =>
      problems.push(`#${link.pageId} is not in Navikronos but has parentPage #${link.parentId}`)
    )
})

if (problems.length > 0) {
  console.log(`\n${problems.length} problems:`)
  problems.forEach((problem) => console.log(`  ${problem}`))
  process.exit(1)
}
console.log('\nOK: parentPage matches Navikronos (parents, order, paths, legacy slugs).')
