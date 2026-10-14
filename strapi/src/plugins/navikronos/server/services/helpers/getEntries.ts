import { getConfig } from './config'
import { Core, UID } from '@strapi/strapi'

export type FetchedEntry = {
  /** Strapi 5 `documentId` - the identifier navigation stores and the frontend links by. */
  id: string
  title: string
  path: string
}

/**
 * Returns entries from entry type routes for UI (to choose from) and for client navigation API
 * (content types and ids of the entries are replaced with real ones with path and title).
 */
export const getEntries = async (
  strapi: Core.Strapi,
  contentTypeUid: string,
  locale?: string,
  documentIds?: string[]
) => {
  const { entryRoutes } = getConfig(strapi)

  const entryRouteConfig = (entryRoutes ?? []).find(
    (route) => route.contentTypeUid === contentTypeUid
  )
  if (!entryRouteConfig) {
    return [] as FetchedEntry[]
  }

  // The uid comes from the plugin config at runtime, so it can't be narrowed to a known UID here.
  const items = await strapi.query(contentTypeUid as UID.ContentType).findMany({
    select: ['documentId', entryRouteConfig.titleAttribute, entryRouteConfig.pathAttribute],
    where: {
      ...(documentIds
        ? {
            documentId: {
              $in: documentIds,
            },
          }
        : {}),
      ...(locale
        ? {
            locale: { $eq: locale },
          }
        : {}),
      publishedAt: { $notNull: true },
    },
  })

  return items.map(
    (entry) =>
      ({
        id: entry.documentId,
        title: entry[entryRouteConfig.titleAttribute],
        path: entry[entryRouteConfig.pathAttribute],
      } as FetchedEntry)
  )
}
