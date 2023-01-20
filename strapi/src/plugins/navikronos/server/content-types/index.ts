import { camelCase } from "lodash";

const config = JSON.parse(process.env["NAVIKRONOS_CONFIG"]) as {
  staticPages?: string[];
  spreadContentTypes?: string[];
  specificContentTypes?: { contentType: string; entityRouteId: string }[];
};

const generatedRelationAttributes = (config.specificContentTypes ?? []).map(
  (type) => [
    camelCase(type.contentType.replace(/::|\./g, " ")), // converts "api::page.page" to "apiPagePage",
    {
      type: "relation",
      relation: "oneToMany",
      target: type,
    },
  ]
);

export default {
  "navikronos-storage": {
    schema: {
      kind: "singleType",
      collectionName: "navikronos-storage",
      info: {
        singularName: "navikronos-storage", // kebab-case mandatory
        pluralName: "navikronos-storages", // kebab-case mandatory
        displayName: "Navikronos Storage",
      },
      options: {
        draftAndPublish: false,
      },
      pluginOptions: {
        "content-manager": {
          visible: true,
        },
        "content-type-builder": {
          visible: true,
        },
        // i18n: {
        //   localized: true,
        // },
      },
      attributes: {
        ...Object.fromEntries(generatedRelationAttributes),
      },
    },
  },
};
