import { Id, IStrapi, StrapiContentType, StrapiContext } from "strapi-typed";
import { getI18nStatus } from "../../admin/src/utils/getI18nStatus";
import { fetchEntities, getConfig } from "../helpers";
import { Navigation, SingleRouteChildren } from "../types";

const traverseGetEntitiesToFetch = (navigation: Navigation) => {
  let entitiesToFetch: Record<string, string[]> = {};
  // let multipleRoutesContentTypes = new Set();
  const innerTraverse = (t: SingleRouteChildren) => {
    t.forEach((route) => {
      if (route.type === "single") {
        if (route.content.type === "entity") {
          const { entityType, id } = route.content;
          if (!entitiesToFetch[entityType]) {
            entitiesToFetch[entityType] = [];
          }
          entitiesToFetch[entityType].push(id);
        }
        if (route.children) {
          innerTraverse(route.children);
        }
      }
      // verify multiple
    });
  };

  innerTraverse(navigation);

  return { entitiesToFetch };
};

export const adminService = ({ strapi }: { strapi: IStrapi }) => {
  return {
    async getAllData() {
      const i18n = await getI18nStatus({ strapi });
      const { specificContentTypes, staticPages, spreadContentTypes } =
        getConfig(strapi);
      const n = specificContentTypes.map(({ contentType }) => async () => {
        const fetched = await fetchEntities(strapi, contentType);
        return [contentType, fetched];
      });

      const specificContentTypesEntries = Object.fromEntries(
        await Promise.all(n.map((g) => g()))
      );

      return {
        i18n,
        specificContentTypesEntries,
        staticPages,
        spreadContentTypes,
      };
    },

    async getNavigation() {
      const navigation = (await strapi
        .query("api::navikronos-storage.navikronos-storage")
        .findMany({})) as any;

      const nav = navigation[0].navigation as Navigation;
      //
      // const { entitiesToFetch } = traverseGetEntitiesToFetch(nav);
      // console.log(entitiesToFetch);
      // const promises = Object.entries(entitiesToFetch).map(
      //   ([contentType, ids]) => {
      //     return async () => {
      //       const fetched = await fetchEntities(contentType, ids);
      //       const mapped = Object.fromEntries(
      //         fetched.map((entry) => [entry.id, entry])
      //       );
      //       return [contentType, mapped];
      //     };
      //   }
      // );
      //
      // const entities = Object.fromEntries(
      //   await Promise.all(promises.map((x) => x()))
      // );

      return nav;
    },

    async putNavigation() {},

    //   async getContentTypeItems(contentType: string) {
    //     contentType = "api::event.event";
    //
    //     const { specificContentTypes } = getConfig(strapi);
    //     const x = specificContentTypes.find((a) => a.contentType === contentType);
    //     if (!x) {
    //       return;
    //     }
    //
    //     // contentType = "api::file-category.file-category";
    //
    //     const populate = [];
    //
    //     let now = performance.now();
    //
    //     const contentTypeItems = await strapi
    //       .query<StrapiContentType<any>>(contentType)
    //       .findMany({
    //         // populate,
    //       });
    //
    //     console.log("a:", performance.now() - now);
    //
    //     const ids = contentTypeItems.map(({ id }) => id);
    //
    //     now = performance.now();
    //
    //     const contentTypeItems2 = await strapi
    //       .query<StrapiContentType<any>>(contentType)
    //       .findMany({
    //         where: {
    //           id: {
    //             $in: ids.slice(0, 25),
    //           },
    //         },
    //       });
    //
    //     console.log("b:", performance.now() - now);
    //
    //     return contentTypeItems.map(({ id, ...t }) => ({
    //       id,
    //       title: t[x.titleAttribute],
    //       path: t[x.pathAttribute],
    //     }));
    //
    //     // return contentTypeItems;
    //   },
    // };
  };
};
