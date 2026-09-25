import { getConfig } from './config'
import { Core, UID } from '@strapi/strapi'

export type FetchedEntry = {
  id: number
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
  ids?: number[]
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
    select: ['id', entryRouteConfig.titleAttribute, entryRouteConfig.pathAttribute],
    where: {
      ...(ids
        ? {
            id: {
              $in: ids,
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
        id: entry.id,
        title: entry[entryRouteConfig.titleAttribute],
        path: entry[entryRouteConfig.pathAttribute],
      } as FetchedEntry)
  )
}
