import { IStrapi, StrapiContentType } from "strapi-typed";
import { NavikronosConfig } from "./types";

export const getConfig = (strapi: IStrapi) =>
  strapi.config.get("plugin.navikronos") as NavikronosConfig;

export const validateConfig = () => {};

export type FetchedEntry = {
  id: string;
  title: string;
  path: string;
};

export const fetchEntries = async (
  strapi: IStrapi,
  contentTypeUid: string,
  ids?: string[]
) => {
  const { entryRoutes } = getConfig(strapi)!;
  // TODO remove !

  const contentTypeConfig = (entryRoutes! ?? []).find(
    (specificContentType) =>
      specificContentType.contentTypeUid === contentTypeUid
  );
  if (!contentTypeConfig) {
    return [] as FetchedEntry[];
  }

  // filter published
  const items = await strapi
    .query<StrapiContentType<any>>(contentTypeUid)
    .findMany({
      select: [
        "id",
        contentTypeConfig.titleAttribute,
        contentTypeConfig.pathAttribute,
      ],
      where: ids
        ? {
            id: {
              $in: ids,
            },
          }
        : {},
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
