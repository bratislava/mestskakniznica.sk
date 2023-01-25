import { Strapi } from "@strapi/strapi";
import objectHash from "object-hash";
import { contentTypeToRelationName, getConfig } from "./helpers";
import { IStrapi } from "strapi-typed";

export default async ({ strapi }: { strapi: IStrapi }) => {
  const config = getConfig(strapi);

  // const generatedRelationAttributes = Object.fromEntries(
  //   (config.specificContentTypes ?? []).map((type) => [
  //     contentTypeToRelationName(type.contentType),
  //     {
  //       type: "relation",
  //       relation: "oneToMany",
  //       target: type.contentType,
  //     },
  //   ])
  // );

  debugger;

  const existing =
    strapi.contentTypes["api::navikronos-storage.navikronos-storage"];

  const contentType = {
    draftAndPublish: false,
    pluginOptions: {
      i18n: {
        localized: true,
      },
    },
    singularName: "navikronos-storage",
    pluralName: "navikronos-storages",
    displayName: "Navikronos Storage",
    kind: "singleType",
    attributes: {
      navigation: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "json",
      },
      // ...generatedRelationAttributes,
    },
  };

  const hashedObject = objectHash(contentType);

  const contentTypeWithHashInDescription = {
    ...contentType,
    description: hashedObject,
  };

  if (existing) {
    if (existing.info?.description === hashedObject) {
      return;
    }

    // https://github.com/strapi/strapi/blob/fc781681a34c5a1b0e21d8bf56d1d948ce82db37/packages/core/content-type-builder/server/controllers/content-types.js#L58
    // @ts-ignore
    strapi.reload.isWatching = false;

    await strapi
      .plugin("content-type-builder")
      .services["content-types"].editContentType(
        "api::navikronos-storage.navikronos-storage",
        {
          contentType: contentTypeWithHashInDescription,
        }
      );

    // https://github.com/strapi/strapi/blob/fc781681a34c5a1b0e21d8bf56d1d948ce82db37/packages/core/content-type-builder/server/controllers/content-types.js#L80
    setImmediate(() => strapi.reload());
  } else {
    // @ts-ignore
    strapi.reload.isWatching = false;

    await strapi
      .plugin("content-type-builder")
      .services["content-types"].createContentType({
        contentType: contentTypeWithHashInDescription,
      });

    setImmediate(() => strapi.reload());
  }
};
