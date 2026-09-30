import { Core, UID } from '@strapi/strapi'

// Navigation saved by Strapi 4 references entries by numeric `id`, Strapi 5 uses string `documentId`.
type StoredRoute = {
  type: string
  contentTypeUid?: string
  entryId?: number | string
  children?: StoredRoute[]
}

const isLegacyEntryRoute = (route: StoredRoute) =>
  route.type === 'entry' && typeof route.entryId === 'number'

const collectLegacyUids = (routes: StoredRoute[] = [], uids = new Set<string>()) => {
  routes.forEach((route) => {
    if (isLegacyEntryRoute(route) && route.contentTypeUid) {
      uids.add(route.contentTypeUid)
    }
    collectLegacyUids(route.children, uids)
  })
  return uids
}

/**
 * Converts numeric `entryId`s in the stored navigation to `documentId`s. Runs in bootstrap (after
 * Strapi's internal v5 migrations have created `document_id` columns) and does nothing once all
 * ids are converted, so it's safe to run on every start.
 */
export const migrateEntryIdsToDocumentIds = async (strapi: Core.Strapi) => {
  const knex = strapi.db.connection
  const storageTable = strapi.db.metadata.get('plugin::navikronos.navikronos-storage').tableName

  const row = await knex(storageTable).first()
  if (!row?.data) return

  const data: Record<string, StoredRoute[]> =
    typeof row.data === 'string' ? JSON.parse(row.data) : row.data

  const uids = new Set<string>()
  Object.values(data).forEach((routes) => collectLegacyUids(routes, uids))
  if (uids.size === 0) return

  const documentIdMaps = new Map<string, Map<number, string>>()
  for (const uid of uids) {
    const { tableName } = strapi.db.metadata.get(uid as UID.ContentType)
    const rows = await knex(tableName).select('id', 'document_id')
    documentIdMaps.set(uid, new Map(rows.map((r) => [r.id, r.document_id])))
  }

  let converted = 0
  let missing = 0

  const convert = (routes: StoredRoute[] = []): StoredRoute[] =>
    routes.map((route) => {
      let updated = route
      if (isLegacyEntryRoute(route)) {
        const documentId = documentIdMaps.get(route.contentTypeUid)?.get(route.entryId as number)
        if (documentId) {
          converted += 1
        } else {
          missing += 1
          strapi.log.warn(
            `[navikronos] No documentId for ${route.contentTypeUid} #${route.entryId}, keeping it as a string.`
          )
        }
        updated = { ...route, entryId: documentId ?? String(route.entryId) }
      }
      return updated.children ? { ...updated, children: convert(updated.children) } : updated
    })

  const convertedData = Object.fromEntries(
    Object.entries(data).map(([locale, routes]) => [locale, convert(routes)])
  )

  await knex(storageTable)
    .where({ id: row.id })
    .update({ data: JSON.stringify(convertedData) })

  strapi.log.info(
    `[navikronos] Converted ${converted} entry ids to documentIds (${missing} without a match).`
  )
}
