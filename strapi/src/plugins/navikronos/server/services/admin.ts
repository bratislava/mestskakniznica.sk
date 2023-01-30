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
  NavikronosLocaleNavigations,
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
        .findOne({});

      console.log(navigation);

      if (!navigation) {
        return {};
      }

      return navigation.data ?? {};
    },

    async putNavigation(navigations: AdminPutNavigationInput) {
      try {
        navikronosLocaleNavigationsSchema.parse(navigations);
      } catch (e) {
        return "error";
      }

      const queriedNavigation = await strapi
        .query<{ id: number }>("plugin::navikronos.navikronos-storage")
        .findOne({});

      const id = queriedNavigation ? queriedNavigation.id : null;

      if (id) {
        await strapi
          .query<{ id: string; data: NavikronosLocaleNavigations }>(
            "plugin::navikronos.navikronos-storage"
          )
          .update({ where: { id }, data: { data: navigations } });
      } else {
        await strapi
          .query("plugin::navikronos.navikronos-storage")
          .create({ data: { data: navigations } });
      }
      return { success: true };
    },
  };
};
