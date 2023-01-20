import { camelCase } from "lodash";
import { Strapi } from "@strapi/strapi";

/**
 * Converts e.g. "api::page.page" to "relationsApiPagePage"
 */
export const contentTypeToRelationName = (contentType: string) =>
  camelCase(`relations ${contentType.replace(/::|\./g, " ")}`);

export const getConfig = (strapi: Strapi) => {
  return strapi.config.get("plugin.navikronos") as {
    staticPages?: string[];
    spreadContentTypes?: string[];
    specificContentTypes?: {
      contentType: string;
      pathAttribute: string;
      titleAttribute: string;
    }[];
  };
};
