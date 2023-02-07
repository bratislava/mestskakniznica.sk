import { IStrapi } from "strapi-typed";
import { NavikronosPluginConfig } from "../../../shared/types";
import { navikronosConfigSchema } from "../../../shared/zod";

export const getConfig = (strapi: IStrapi) =>
  strapi.config.get("plugin.navikronos") as NavikronosPluginConfig;

const smallLettersDashRegexp = /^[a-z-]+$/;

export const validateConfig = (
  strapi: IStrapi,
  config: NavikronosPluginConfig
) => {
  // Basic shape validation
  try {
    navikronosConfigSchema.parse(config);
  } catch (e) {
    throw new Error(`Navikronos plugin config error: ${e}`);
  }

  config.staticRouteIds?.forEach((id) => {
    if (!smallLettersDashRegexp.test(id)) {
      throw new Error(
        `Navikronos plugin config error: "staticRouteIds" should contain only small letters and dashes.`
      );
    }
  });

  config.entryRoutes?.forEach(
    ({ contentTypeUid, titleAttribute, pathAttribute }) => {
      const contentType = strapi.contentTypes[contentTypeUid];
      if (!contentType) {
        throw new Error(
          `Navikronos plugin config error: "${contentTypeUid}" content type doesn't exist.`
        );
      }

      [titleAttribute, pathAttribute].forEach((attribute) => {
        const attributeObject = contentType.attributes[attribute];
        if (!attributeObject) {
          throw new Error(
            `Navikronos plugin config error: "${contentTypeUid}" content type doesn't have "${attribute}" attribute.`
          );
        }

        if (attributeObject.type !== "string") {
          throw new Error(
            `Navikronos plugin config error: "${contentTypeUid}" content type's "${attribute}" attribute must be of type "string".`
          );
        }
      });
    }
  );
};
