import pg from 'pg'

/**
 * Connects with the same environment variables and defaults as config/database.ts. Run the scripts with the env file
 * Strapi uses, e.g. `node --env-file=.env.local scripts/navigation-migration/audit.mjs`.
 */
export const withDb = async (callback) => {
  const client = new pg.Client({
    host: process.env.DATABASE_HOST ?? '127.0.0.1',
    port: Number(process.env.DATABASE_PORT ?? 5432),
    database: process.env.DATABASE_NAME ?? 'city-library',
    user: process.env.DATABASE_USERNAME ?? 'city-library',
    password: process.env.DATABASE_PASSWORD ?? 'password',
  })
  await client.connect()

  try {
    return await callback(client)
  } finally {
    await client.end()
  }
}

const query = async (client, sql) => (await client.query(sql)).rows

/** Raw Navikronos storage `{ [locale]: Route[] }`, including draft pages (unlike the public /navikronos endpoint). */
export const loadNavikronos = async (client) => {
  const [storage] = await query(client, 'SELECT data FROM "navikronos-storage" ORDER BY id LIMIT 1')

  return storage?.data ?? {}
}

/** All page rows (every locale, drafts included) by id. */
export const loadPages = async (client) => {
  const pages = await query(
    client,
    `SELECT id, locale, published_at IS NOT NULL AS published, slug, new_slug AS "newSlug", title,
            updated_at AS "updatedAt"
     FROM pages
     ORDER BY id`
  )

  return new Map(pages.map((page) => [page.id, page]))
}

/** Page id -> ids of its localizations */
export const loadPageLocalizations = async (client) => {
  const links = await query(
    client,
    'SELECT page_id AS "pageId", inv_page_id AS "localizationId" FROM pages_localizations_links'
  )
  const localizations = new Map()
  const add = (from, to) =>
    localizations.set(from, new Set([...(localizations.get(from) ?? []), to]))
  links.forEach(({ pageId, localizationId }) => {
    add(pageId, localizationId)
    add(localizationId, pageId)
  })

  return localizations
}

/** Rows of the page `parentPage` relation. `order` is the position of the page among its parent's childPages. */
export const loadParentLinks = async (client) =>
  query(
    client,
    'SELECT page_id AS "pageId", inv_page_id AS "parentId", page_order AS "order" FROM pages_parent_page_links'
  )

/** Content types with detail pages, keyed by the alias used in the Navikronos `contentTypeUid`. */
export const DETAIL_CONTENT_TYPES = {
  'blog-post': { table: 'blog_posts', localized: true, draftAndPublish: true },
  event: { table: 'events', localized: true, draftAndPublish: true },
  notice: { table: 'notices', localized: true, draftAndPublish: true },
  branch: { table: 'branches', localized: true, draftAndPublish: false },
  asset: { table: 'assets', localized: false, draftAndPublish: true },
  disclosure: { table: 'disclosures', localized: false, draftAndPublish: false },
}

/** Published slugs per detail content type and locale. Not localized types use the locale key `*`. */
export const loadDetailSlugs = async (client) => {
  const result = {}
  for (const [type, { table, localized, draftAndPublish }] of Object.entries(
    DETAIL_CONTENT_TYPES
  )) {
    const rows = await query(
      client,
      `SELECT ${localized ? 'locale' : `'*'`} AS locale, array_agg(slug ORDER BY slug) AS slugs
       FROM ${table}
       ${draftAndPublish ? 'WHERE published_at IS NOT NULL' : ''}
       GROUP BY 1`
    )
    result[type] = Object.fromEntries(rows.map(({ locale, slugs }) => [locale, slugs]))
  }

  return result
}
