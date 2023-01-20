import { Strapi } from "@strapi/strapi";
import objectHash from "object-hash";
import { contentTypeToRelationName, getConfig } from "./helpers";

export default async ({ strapi }: { strapi: Strapi }) => {
  const config = getConfig(strapi);

  const generatedRelationAttributes = Object.fromEntries(
    (config.specificContentTypes ?? []).map((type) => [
      contentTypeToRelationName(type.contentType),
      {
        type: "relation",
        relation: "oneToMany",
        target: type.contentType,
      },
    ])
  );

  console.log(generatedRelationAttributes);

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
      ...generatedRelationAttributes,
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
    await strapi
      .plugin("content-type-builder")
      .services["content-types"].editContentType(
        "api::navikronos-storage.navikronos-storage",
        {
          contentType: contentTypeWithHashInDescription,
        }
      );
  } else {
    await strapi
      .plugin("content-type-builder")
      .services["content-types"].createContentType({
        contentType: contentTypeWithHashInDescription,
      });
  }
};
