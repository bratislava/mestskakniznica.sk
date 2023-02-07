import { IStrapi } from "strapi-typed";
import { NavikronosPluginConfig } from "../../../shared/types";
import { getEntries } from "./getEntries";
import { I18NStatus } from "./getI18nStatus";

/**
 * Returns all published entries for all available locales for admin UI.
 *
 * E.g.:
 * ```
 * {
 *   "en": {
 *     "api::page.page": [
 *       {
 *         "id": 122,
 *         "title": "Work in the library",
 *         "path": "work-in-the-library"
 *       },
 *       ...
 *     ]
 *   }
 *   ...
 * }
 */
export const getEntryRouteEntries = async (
  strapi: IStrapi,
  entryRoutes: NavikronosPluginConfig["entryRoutes"],
  i18n: I18NStatus
) => {
  const localeCodes = i18n.enabled
    ? i18n.locales.map(({ code }) => code)
    : [null];

  const entries = await Promise.all(
    localeCodes.map(async (locale) => {
      const entryRouteEntriesPromises = (entryRoutes ?? []).map(
        ({ contentTypeUid }) =>
          async () => {
            const fetched = await getEntries(strapi, contentTypeUid, locale);
            return [contentTypeUid, fetched] as const;
          }
      );

      return [
        locale,
        Object.fromEntries(
          await Promise.all(entryRouteEntriesPromises.map((p) => p()))
        ),
      ] as const;
    })
  );

  return Object.fromEntries(entries);
};
