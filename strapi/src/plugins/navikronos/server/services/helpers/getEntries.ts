import { IStrapi, StrapiContentType } from "strapi-typed";
import { getConfig } from "./config";

export type FetchedEntry = {
  id: number;
  title: string;
  path: string;
};
export const getEntries = async (
  strapi: IStrapi,
  contentTypeUid: string,
  locale?: string,
  ids?: number[]
) => {
  const { entryRoutes } = getConfig(strapi);

  const contentTypeConfig = (entryRoutes ?? []).find(
    (specificContentType) =>
      specificContentType.contentTypeUid === contentTypeUid
  );
  if (!contentTypeConfig) {
    return [] as FetchedEntry[];
  }

  // filter published + locale
  const items = await strapi
    .query<StrapiContentType<any>>(contentTypeUid)
    .findMany({
      select: [
        "id",
        contentTypeConfig.titleAttribute,
        contentTypeConfig.pathAttribute,
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
      },
    });

  return items.map(
    (entry) =>
      ({
        id: entry.id,
        title: entry[contentTypeConfig.titleAttribute],
        path: entry[contentTypeConfig.pathAttribute],
      } as FetchedEntry)
  );
};
