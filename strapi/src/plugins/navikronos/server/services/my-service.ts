import { Strapi } from "@strapi/strapi";
import { contentTypeToRelationName, getConfig } from "../helpers";

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

    console.log("result", result);

    return JSON.stringify(
      await strapi.entityService.findMany(
        "api::navikronos-storage.navikronos-storage",
        {}
      )
    );
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
