import { camelCase } from "lodash";
import { Strapi } from "@strapi/strapi";
import { IStrapi, StrapiContentType } from "strapi-typed";

/**
 * Converts e.g. "api::page.page" to "relationsApiPagePage"
 */
export const contentTypeToRelationName = (contentType: string) =>
  camelCase(`relations ${contentType.replace(/::|\./g, " ")}`);

export const getConfig = (strapi: IStrapi) => {
  return strapi.config.get("plugin.navikronos") as {
    staticPages?: string[];
    spreadContentTypes?: string[];
    specificContentTypes?: {
      contentType: string;
      pathAttribute: string;
      titleAttribute: string;
    }[];
    enableListing?: boolean;
  };
};

export const fetchEntities = async (
  strapi: IStrapi,
  contentType: string,
  ids?: string[]
) => {
  const { specificContentTypes } = getConfig(strapi);
  const x = specificContentTypes.find((a) => a.contentType === contentType);
  if (!x) {
    return;
  }

  // filter published
  const items = await strapi
    .query<StrapiContentType<any>>(contentType)
    .findMany({
      select: ["id", x.titleAttribute, x.pathAttribute],
      where: ids
        ? {
            id: {
              $in: ids,
            },
          }
        : {},
    });

  return items;
};
