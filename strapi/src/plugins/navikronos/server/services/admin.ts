import { IStrapi, StrapiContentTypeInfo } from "strapi-typed";
import { getI18nStatus } from "./helpers/getI18nStatus";
import {
  AdminGetConfigResponse,
  AdminGetNavigationResponse,
  AdminPutNavigationInput,
  AdminPutNavigationResponse,
  AdminService,
  NavikronosLocaleNavigations,
} from "../../shared/types";
import { navikronosLocaleNavigationsSchema } from "../../shared/zod";
import { getNavigation } from "./helpers/getNavigation";
import { getConfig } from "./helpers/config";
import { fetchEntries } from "./helpers/getEntries";

export default ({ strapi }: { strapi: IStrapi }): AdminService => {
  return {
    async getConfig(): Promise<AdminGetConfigResponse> {
      const i18n = await getI18nStatus({ strapi });

      const { entryRoutes, staticRouteIds, contentTypeRoutes } =
        getConfig(strapi);
      const entryRouteEntriesPromises = (entryRoutes ?? []).map(
        ({ contentTypeUid }) =>
          async () => {
            // TODO locale
            const fetched = await fetchEntries(strapi, contentTypeUid, "sk");
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
        // listingEnabled: enableListing,
      };
    },

    async getNavigation(): Promise<AdminGetNavigationResponse> {
      console.log("yes here");

      return getNavigation(strapi);
    },

    async putNavigation({
      navigation,
    }: AdminPutNavigationInput): Promise<AdminPutNavigationResponse> {
      try {
        navikronosLocaleNavigationsSchema.parse(navigation);
      } catch (e) {
        // TODO error
        // return "error";
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
          .update({ where: { id }, data: { data: navigation } });
      } else {
        await strapi
          .query("plugin::navikronos.navikronos-storage")
          .create({ data: { data: navigation } });
      }
      return { success: true };
    },
  };
};
