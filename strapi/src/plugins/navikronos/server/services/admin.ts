import { Core, Struct, UID } from "@strapi/strapi";
import { getI18nStatus } from "./helpers/getI18nStatus";
import {
  AdminGetConfigResponse,
  AdminGetNavigationResponse,
  AdminPutNavigationInput,
  AdminPutNavigationResponse,
  AdminService,
} from "../../shared/types";
import { navikronosLocaleNavigationsSchema } from "../../shared/zod";
import { getNavigation } from "./helpers/getNavigation";
import { getConfig } from "./helpers/config";
import { getEntryRouteEntries } from "./helpers/getEntryRouteEntries";
import { errors } from "@strapi/utils";

const { ApplicationError } = errors;

export default ({ strapi }: { strapi: Core.Strapi }): AdminService => {
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
      const contentTypeInfos = Object.fromEntries<Struct.ContentTypeSchemaInfo>(
        allContentTypesUids.map(
          (contentTypeUid) =>
            [contentTypeUid, strapi.contentTypes[contentTypeUid as UID.ContentType].info] as const,
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
      const queriedNavigation = (await strapi
        .query("plugin::navikronos.navikronos-storage")
        .findOne({})) as { id: number } | null;

      const id = queriedNavigation ? queriedNavigation.id : null;

      if (id) {
        await strapi
          .query("plugin::navikronos.navikronos-storage")
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
