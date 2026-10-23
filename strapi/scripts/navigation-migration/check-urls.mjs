/**
 * Requests the URLs from build-inventory.mjs and records status code and redirect location, so the site can be
 * compared before and after the navigation switch. Redirects are not followed.
 *
 * Usage (from strapi/):
 *   node scripts/navigation-migration/check-urls.mjs --base <origin> --name <run name> [options]
 *
 * Options:
 *   --kinds page,static,home,redirect   only these kinds (default: all; detail kinds are e.g. detail:event)
 *   --sample <n>                        at most n URLs of each detail:* kind, same URLs on every run (default: all)
 *   --concurrency <n>                   parallel requests (default: 4)
 *   --compare <file>                    compare with an earlier run, exit code 1 when anything differs
 *
 * Example baseline on production (light: pages, redirects and a sample of detail pages):
 *   node scripts/navigation-migration/check-urls.mjs --base https://www.mestskakniznica.sk --name prod-before --sample 30
 *
 * Output (gitignored): out/check-<name>.tsv  kind<TAB>url<TAB>status<TAB>location
 */
import { readFile, writeFile } from 'node:fs/promises'
import { parseArgs } from 'node:util'

const OUT_DIR = new URL('./out/', import.meta.url)

const { values: args } = parseArgs({
  options: {
    base: { type: 'string' },
    name: { type: 'string' },
    kinds: { type: 'string' },
    sample: { type: 'string' },
    concurrency: { type: 'string', default: '4' },
    compare: { type: 'string' },
  },
})
if (!args.base || !args.name) {
  console.error('--base and --name are required, see the header of this file.')
  process.exit(2)
}

const readTsv = async (url) =>
  (await readFile(url, 'utf8'))
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split('\t'))

/** Deterministic shuffle (mulberry32), so --sample picks the same URLs before and after the switch. */
const shuffle = (items) => {
  let seed = 616
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  return items
    .map((item) => ({ item, key: random() }))
    .sort((a, b) => a.key - b.key)
    .map(({ item }) => item)
}

const inventory = (await readTsv(new URL('urls-inventory.tsv', OUT_DIR))).map(([kind, url]) => ({ kind, url }))
const redirects = (await readTsv(new URL('redirects.tsv', OUT_DIR))).map(([source]) => ({
  kind: 'redirect',
  url: source,
}))

const kinds = args.kinds?.split(',')
const sample = args.sample ? Number(args.sample) : Infinity
const byKind = new Map()
;[...inventory, ...redirects]
  .filter(({ kind }) => !kinds || kinds.includes(kind))
  .forEach((entry) => byKind.set(entry.kind, [...(byKind.get(entry.kind) ?? []), entry]))
const targets = [...byKind.entries()].flatMap(([kind, list]) =>
  kind.startsWith('detail:') && list.length > sample ? shuffle(list).slice(0, sample) : list
)

const check = async ({ kind, url }) => {
  const requestUrl = new URL(url, args.base)
  for (let attempt = 1; ; attempt += 1) {
    try {
      const response = await fetch(requestUrl, {
        redirect: 'manual',
        headers: { 'user-agent': 'mestskakniznica-navigation-migration-check' },
        signal: AbortSignal.timeout(30_000),
      })
      await response.body?.cancel()
      const location = response.headers.get('location')

      return {
        kind,
        url,
        status: String(response.status),
        // keep locations comparable between environments
        location: location ? decodeURI(new URL(location, requestUrl).pathname) : '',
      }
    } catch (error) {
      if (attempt >= 2) return { kind, url, status: `error: ${error.name}`, location: '' }
    }
  }
}

console.log(`Checking ${targets.length} URLs on ${args.base} ...`)
const results = []
let next = 0
await Promise.all(
  Array.from({ length: Number(args.concurrency) }, async () => {
    while (next < targets.length) {
      const target = targets[next]
      next += 1
      results.push(await check(target))
      if (results.length % 100 === 0) console.log(`  ${results.length}/${targets.length}`)
    }
  })
)
results.sort((a, b) => a.kind.localeCompare(b.kind) || a.url.localeCompare(b.url))

const outFile = new URL(`check-${args.name}.tsv`, OUT_DIR)
await writeFile(
  outFile,
  results.map(({ kind, url, status, location }) => [kind, url, status, location].join('\t')).join('\n') + '\n'
)

const statuses = new Map()
results.forEach(({ kind, status }) => {
  const key = `${kind.padEnd(18)} ${status}`
  statuses.set(key, (statuses.get(key) ?? 0) + 1)
})
console.log('\nkind               status   count')
;[...statuses.entries()].sort().forEach(([key, count]) => console.log(`  ${key.padEnd(26)} ${count}`))
console.log(`\nWritten to ${outFile.pathname}`)

if (args.compare) {
  const previous = new Map(
    (await readTsv(new URL(args.compare, `file://${process.cwd()}/`))).map(([, url, status, location]) => [
      url,
      { status, location: location ?? '' },
    ])
  )
  const differences = results.filter(({ url, status, location }) => {
    const before = previous.get(url)

    return before && (before.status !== status || before.location !== location)
  })
  console.log(`\nCompared with ${args.compare}: ${differences.length} differences`)
  differences.forEach(({ url, status, location }) => {
    const before = previous.get(url)
    console.log(`  ${url}: ${before.status} ${before.location} -> ${status} ${location}`)
  })
  if (differences.length > 0) process.exit(1)
}
