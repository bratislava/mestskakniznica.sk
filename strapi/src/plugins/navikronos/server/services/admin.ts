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
import { getEntryRouteEntries } from "./helpers/getEntryRouteEntries";
import utils from "@strapi/utils";

const { ApplicationError } = utils.errors;

export default ({ strapi }: { strapi: IStrapi }): AdminService => {
  return {
    /**
     * Returns a config for admin UI.
     */
    async getConfig(): Promise<AdminGetConfigResponse> {
      const i18n = await getI18nStatus({ strapi });

      const { entryRoutes, staticRouteIds, contentTypeRoutes } =
        getConfig(strapi);

      const entryRouteEntries = await getEntryRouteEntries(
        strapi,
        entryRoutes,
        i18n,
      );

      const allContentTypesUids = [
        ...(entryRoutes ?? []).map(({ contentTypeUid }) => contentTypeUid),
        ...(contentTypeRoutes ?? []).map(
          ({ contentTypeUid }) => contentTypeUid,
        ),
      ];
      const contentTypeInfos = Object.fromEntries<StrapiContentTypeInfo>(
        allContentTypesUids.map(
          (contentTypeUid) =>
            [contentTypeUid, strapi.contentTypes[contentTypeUid].info] as const,
        ),
      );

      return {
        i18n,
        contentTypeRoutes,
        entryRouteEntries,
        staticRouteIds: staticRouteIds ?? [],
        contentTypeInfos,
      };
    },

    async getNavigation(): Promise<AdminGetNavigationResponse> {
      return getNavigation(strapi);
    },

    async putNavigation({
      navigation,
    }: AdminPutNavigationInput): Promise<AdminPutNavigationResponse> {
      try {
        navikronosLocaleNavigationsSchema.parse(navigation);
      } catch (error) {
        throw new ApplicationError("Navigation validation failed", {
          error,
        });
      }

      // There's not a way in Strapi API to update already existing single type entry, it must be
      // queried and created or updated. Beware, if we create a new entry if a one already exists
      // it breaks the Strapi UI although database allows it.
      const queriedNavigation = await strapi
        .query<{ id: number }>("plugin::navikronos.navikronos-storage")
        .findOne({});

      const id = queriedNavigation ? queriedNavigation.id : null;

      if (id) {
        await strapi
          .query<{
            id: string;
            data: NavikronosLocaleNavigations;
          }>("plugin::navikronos.navikronos-storage")
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
