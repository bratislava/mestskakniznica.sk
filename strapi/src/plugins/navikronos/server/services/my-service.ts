import { Strapi } from "@strapi/strapi";
import { contentTypeToRelationName, getConfig } from "../helpers";

const fix = (a: Navigation, map: any) => {
  a.forEach((g: any) => {
    if ((g as any).type === "specific" && (g as any).key == null) {
      console.log(g.contentType, map[g.contentType]);
      (g as any).key = map[g.contentType][String(g.id)];
    }
    if ((g as any).children) {
      fix(g.children, map);
    }
  });
};

export default ({ strapi }: { strapi: Strapi }) => ({
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
      { fields: ["id", type.entityRouteId] },
    ]);

    const result = await strapi.entityService.findMany(
      "api::navikronos-storage.navikronos-storage",
      {
        populate: Object.fromEntries(toPopulate),
      }
    );

    const map = Object.fromEntries(
      (config.specificContentTypes ?? []).map((type) => [
        type.contentType,
        Object.fromEntries(
          result[contentTypeToRelationName(type.contentType)].map((e) => [
            String(e.id),
            e[type.entityRouteId],
          ])
        ),
      ])
    );

    console.log(map);

    fix(result.navigation, map);

    console.log(result.navigation);
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
