import { IStrapi, StrapiContentType } from "strapi-typed";
import { getConfig } from "./config";

export type FetchedEntry = {
  id: number;
  title: string;
  path: string;
};

/**
 * Returns entries from entry type routes for UI (to choose from) and for client navigation API
 * (content types and ids of the entries are replaced with real ones with path and title).
 */
export const getEntries = async (
  strapi: IStrapi,
  contentTypeUid: string,
  locale?: string,
  ids?: number[]
) => {
  const { entryRoutes } = getConfig(strapi);

  const entryRouteConfig = (entryRoutes ?? []).find(
    (route) => route.contentTypeUid === contentTypeUid
  );
  if (!entryRouteConfig) {
    return [] as FetchedEntry[];
  }

  const items = await strapi
    .query<StrapiContentType<any>>(contentTypeUid)
    .findMany({
      select: [
        "id",
        entryRouteConfig.titleAttribute,
        entryRouteConfig.pathAttribute,
      ],
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
    });

  return items.map(
    (entry) =>
      ({
        id: entry.id,
        title: entry[entryRouteConfig.titleAttribute],
        path: entry[entryRouteConfig.pathAttribute],
      } as FetchedEntry)
  );
};
