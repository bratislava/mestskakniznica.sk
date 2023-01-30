import {
  Id,
  IStrapi,
  StrapiContentType,
  StrapiContentTypeInfo,
  StrapiContext,
} from "strapi-typed";
import { getI18nStatus } from "../getI18nStatus";
import { fetchEntries, getConfig } from "../helpers";
import {
  AdminConfig,
  AdminGetConfigResponse,
  AdminGetNavigationResponse,
  AdminPutNavigationInput,
  ClientGetNavigationResponse,
  NavikronosNavigation,
  NavikronosStorageContentType,
} from "../types";
import { navikronosLocaleNavigationsSchema } from "../zod";

export default ({ strapi }: { strapi: IStrapi }) => {
  return {
    async getConfig(): Promise<AdminGetConfigResponse> {
      const i18n = await getI18nStatus({ strapi });

      const { entryRoutes, staticRouteIds, contentTypeRoutes, enableListing } =
        getConfig(strapi);
      const entryRouteEntriesPromises = (entryRoutes ?? []).map(
        ({ contentTypeUid }) =>
          async () => {
            const fetched = await fetchEntries(strapi, contentTypeUid);
            return [contentTypeUid, fetched] as const;
          }
      );

      const entryRouteEntries = Object.fromEntries(
        await Promise.all(entryRouteEntriesPromises.map((p) => p()))
      );

      const allContentTypesUids = [
        ...(entryRoutes ?? []).map(({ contentTypeUid }) => contentTypeUid),
        ...(contentTypeRoutes ?? []).map(
          ({ contentTypeUid }) => contentTypeUid
        ),
      ];
      const contentTypeInfos = Object.fromEntries<StrapiContentTypeInfo>(
        allContentTypesUids.map(
          (contentTypeUid) =>
            [contentTypeUid, strapi.contentTypes[contentTypeUid].info] as const
        )
      );

      return {
        i18n,
        contentTypeRoutes,
        entryRouteEntries,
        staticRouteIds: staticRouteIds ?? [],
        contentTypeInfos,
        listingEnabled: enableListing,
      };
    },

    async getNavigation(): Promise<AdminGetNavigationResponse> {
      const navigation = await strapi
        .query<NavikronosStorageContentType>(
          "plugin::navikronos.navikronos-storage"
        )
        .findMany({});

      console.log(navigation);

      if (!navigation[0]) {
        return {};
      }

      return navigation[0].data ?? {};
    },

    async putNavigation(navigations: AdminPutNavigationInput) {
      try {
        const parsed = navikronosLocaleNavigationsSchema.parse(navigations);
        console.log(parsed);
        await strapi
          .query("plugin::navikronos.navikronos-storage")
          .create({ data: parsed });

        return "xx";
      } catch (e) {
        console.log(e);
      }
    },

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
