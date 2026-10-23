/**
 * Phase 0 of the Navikronos -> parentPage migration: writes every public URL of the site (both locales) and every
 * redirect from next/next.config.ts, so the same URLs can be checked before and after the switch (check-urls.mjs).
 * Read-only towards the database.
 *
 * Usage (from strapi/): node --env-file=.env.local scripts/navigation-migration/build-inventory.mjs
 *
 * Output (gitignored):
 *   out/urls-inventory.tsv  kind<TAB>url
 *   out/redirects.tsv       source<TAB>destination<TAB>final destination after redirect chains<TAB>ok|broken
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'

import { loadDetailSlugs, loadNavikronos, loadPages, withDb } from './lib/db.mjs'
import { flattenNavikronos, getContentTypeAlias, groupBy, LOCALE_PREFIX } from './lib/navikronos.mjs'

const OUT_DIR = new URL('./out/', import.meta.url)
const NEXT_CONFIG = new URL('../../../next/next.config.ts', import.meta.url)

const urls = new Map() // url -> kind

await withDb(async (client) => {
  const navikronos = await loadNavikronos(client)
  const pages = await loadPages(client)
  const detailSlugs = await loadDetailSlugs(client)

  for (const [locale, routes] of Object.entries(navikronos)) {
    const prefix = LOCALE_PREFIX[locale]
    urls.set(prefix || '/', 'home')

    flattenNavikronos(routes, pages)
      .filter((node) => node.live)
      .forEach((node) => {
        if (node.type === 'entry') urls.set(`${prefix}${node.path}`, 'page')
        if (node.type === 'static') urls.set(`${prefix}${node.path}`, 'static')
        if (node.type === 'contentType') {
          const type = getContentTypeAlias(node.route.contentTypeUid)
          const slugs = detailSlugs[type]?.[locale] ?? detailSlugs[type]?.['*'] ?? []
          slugs.forEach((slug) => urls.set(`${prefix}${node.parent?.path ?? ''}/${slug}`, `detail:${type}`))
        }
      })
  }
})

// Redirects are plain object literals in next.config.ts, so a regex over the `redirects()` part is enough.
const nextConfig = await readFile(NEXT_CONFIG, 'utf8')
const redirectsSource = nextConfig.slice(nextConfig.indexOf('async redirects()'))
const redirects = [...redirectsSource.matchAll(/source:\s*'([^']*)',\s*destination:\s*'([^']*)'/g)].map(
  // `\\:` escapes path-to-regexp syntax, the real path contains just `:`
  ([, source, destination]) => ({ source: source.replaceAll('\\', ''), destination })
)
const redirectMap = new Map(redirects.map(({ source, destination }) => [source, destination]))

const resolveChain = (destination) => {
  let current = destination
  for (let hop = 0; hop < 10 && redirectMap.has(current.split('?')[0]); hop += 1) {
    current = redirectMap.get(current.split('?')[0])
  }

  return current
}

// Redirects without `locale: false` apply to every locale, so a destination is fine if it exists in either of them.
const existsToday = (destination) => {
  const path = destination.split(/[?#]/)[0].replace(/\/$/, '') || '/'

  return urls.has(path) || urls.has(`/en${path}`) || path === '/sk' || path.startsWith('/api/')
}

const checkedRedirects = redirects.map((redirect) => {
  const finalDestination = resolveChain(redirect.destination)

  return { ...redirect, finalDestination, status: existsToday(finalDestination) ? 'ok' : 'broken' }
})

await mkdir(OUT_DIR, { recursive: true })
await writeFile(
  new URL('urls-inventory.tsv', OUT_DIR),
  [...urls.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([url, kind]) => `${kind}\t${url}`)
    .join('\n') + '\n'
)
await writeFile(
  new URL('redirects.tsv', OUT_DIR),
  checkedRedirects
    .map(({ source, destination, finalDestination, status }) =>
      [source, destination, finalDestination, status].join('\t')
    )
    .join('\n') + '\n'
)

const kinds = groupBy([...urls.values()], (kind) => kind)
console.log(`URLs: ${urls.size}`)
Object.entries(kinds)
  .sort(([, a], [, b]) => b.length - a.length)
  .forEach(([kind, list]) => console.log(`  ${kind.padEnd(18)} ${list.length}`))

const broken = checkedRedirects.filter(({ status }) => status === 'broken')
console.log(`\nRedirects: ${redirects.length}, ending at a URL that does not exist today: ${broken.length}`)
broken.forEach(({ source, finalDestination }) => console.log(`  ${source}  ->  ${finalDestination}`))
console.log(`\nWritten to ${OUT_DIR.pathname}`)
