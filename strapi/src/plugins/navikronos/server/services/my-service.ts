import { Strapi } from "@strapi/strapi";
import { contentTypeToRelationName, getConfig } from "../helpers";
import { IStrapi } from "strapi-typed";

const fix = (navigation: Navigation, map: any) => {
  return navigation
    .map((route) => {
      if (route.type === "single" && route.content.type === "entity") {
        const fromMap =
          map &&
          map[route.content.entityType] &&
          map[route.content.entityType][route.content.id];
        if (!fromMap || fromMap.isDraft) {
          return;
        }
        return {
          type: route.type,
          content: {
            type: "entity",
            entityType: route.content.entityType,
            id: route.content.id,
            path: route.content.overridePath ?? fromMap.path,
            title: route.content.overridePath ?? fromMap.title,
          },
          children: fix(route.children, map),
        };
      }
      if (route.type === "single" && route.children) {
        return { ...route, children: fix(route.children, map) };
      }
      return route;
    })
    .filter((c) => c != null);
};

export default ({ strapi }: { strapi: IStrapi }) => ({
  async getWelcomeMessage() {
    const config = getConfig(strapi);

    // const x = await strapi.entityService.find(
    //   "api::navikronos-storage.navikronos-storage"
    // );
    // // .findOne({ select: ["navigation"], populate: ["*"] });
    // return x;
    // // return "Welcome to Strapi 🚀";

    const toPopulate = (config.specificContentTypes ?? []).map((type) => [
      contentTypeToRelationName(type.contentType),
      {
        fields: ["id", type.pathAttribute, type.titleAttribute, "publishedAt"],
      },
    ]);

    const result = (await strapi
      .query("api::navikronos-storage.navikronos-storage")
      .findMany({
        populate: Object.fromEntries(toPopulate),
      })) as any;

    // return result;

    const map = Object.fromEntries(
      (config.specificContentTypes ?? []).map((type) => [
        type.contentType,
        Object.fromEntries(
          result[contentTypeToRelationName(type.contentType)].map((e) => [
            String(e.id),
            {
              title: e[type.titleAttribute],
              path: e[type.pathAttribute],
              isDraft: !Boolean(e.publishedAt),
            } as const,
          ])
        ),
      ])
    );

    console.log(map);

    const fixed = { map, fixed: fix(result.navigation, map) };
    return fixed;
    //
    // console.log("result", result);

    // return await strapi.entityService.findMany(
    //   "api::navikronos-storage.navikronos-storage",
    //   { locale: "sk" }
    // );

    // return await strapi.db
    //   .query("api::navikronos-storage.navikronos-storage")
    //   .findMany({
    //     // uid syntax: 'api::api-name.content-type-name'
    //     where: {
    //       // title: {
    //       //   $startsWith: '2021',
    //       //   $endsWith: 'v4',
    //       // },
    //     },
    //     // populate: true
    //   });
  },
});
