import { IStrapi } from "strapi-typed";
import {
  ClientGetNavigationResponse,
  ClientService,
  NavikronosClientEntryRoute,
  NavikronosClientNavigation,
  NavikronosClientRoute,
  NavikronosClientRoutes,
  NavikronosNavigation,
  NavikronosRoutes,
} from "../../shared/types";
import { getNavigation } from "./helpers/getNavigation";
import { FetchedEntry, fetchEntries } from "./helpers/getEntries";
import { getI18nStatus } from "./helpers/getI18nStatus";

type EntriesToFetchMap = Record<string, number[]>;
type FetchedEntriesMap = Record<string, Record<string, FetchedEntry>>;

const traverseGetEntriesToFetch = (
  navigation: NavikronosNavigation
): EntriesToFetchMap => {
  const entriesToFetch: EntriesToFetchMap = {};

  const innerTraverse = (t: NavikronosRoutes) => {
    t.forEach((route) => {
      if (route.type === "entry") {
        const { contentTypeUid, entryId } = route;
        if (!entriesToFetch[contentTypeUid]) {
          entriesToFetch[contentTypeUid] = [];
        }
        entriesToFetch[contentTypeUid].push(entryId);
      }
      if (route.type !== "contentType" && route.children) {
        innerTraverse(route.children);
      }
    });
  };

  innerTraverse(navigation);

  return entriesToFetch;
};

/**
 *
 */
const fetchSelectedEntries = async (
  strapi: IStrapi,
  navigation: NavikronosNavigation,
  entriesToFetch: EntriesToFetchMap,
  locale: string
): Promise<FetchedEntriesMap> => {
  const promises = Object.entries(entriesToFetch).map(
    ([contentTypeUid, ids]) => {
      return async () => {
        const fetched = await fetchEntries(strapi, contentTypeUid, locale, ids);
        const mapped = Object.fromEntries(
          fetched.map((entry) => [entry.id, entry])
        );
        return [contentTypeUid, mapped] as const;
      };
    }
  );

  return Object.fromEntries(
    await Promise.all(promises.map((promise) => promise()))
  );
};

const traverseReplaceEntries = (
  navigation: NavikronosNavigation,
  fetchedEntries: FetchedEntriesMap
): NavikronosClientNavigation => {
  const innerTraverse = (routes: NavikronosRoutes) => {
    return routes.map((route) => {
      let children: NavikronosClientRoutes | undefined;
      if (route.type !== "contentType" && route.children) {
        children = innerTraverse(route.children);
      }
      if (route.type === "entry") {
        const { contentTypeUid, entryId } = route;
        const contentTypeEntries = fetchedEntries[contentTypeUid];

        if (!contentTypeEntries) {
          return null;
        }
        const fetchedEntry = contentTypeEntries[entryId];
        if (!fetchedEntry) {
          return null;
        }

        return {
          type: "entry",
          contentTypeUid,
          entryId,
          ...fetchedEntry,
          children,
        } as NavikronosClientEntryRoute;
      }

      return {
        ...route,
        children,
      } as NavikronosClientRoute;
    });
  };

  return innerTraverse(navigation) as NavikronosClientNavigation;
};

export default ({ strapi }: { strapi: IStrapi }): ClientService => ({
  async getNavigation(): Promise<ClientGetNavigationResponse> {
    const navigation = await getNavigation(strapi);
    const i18n = await getI18nStatus({ strapi });

    const allLocales = await Promise.all(
      i18n.locales.map(async ({ code }) => {
        const localeNavigation: NavikronosNavigation = navigation[code] ?? [];
        const entriesToFetch = traverseGetEntriesToFetch(localeNavigation);
        console.log(entriesToFetch);
        const fetchedEntries = await fetchSelectedEntries(
          strapi,
          localeNavigation,
          entriesToFetch,
          code
        );
        // console.log(code, fetchedEntries, code);
        return [
          code,
          traverseReplaceEntries(localeNavigation, fetchedEntries),
        ] as const;
      })
    );

    return Object.fromEntries<NavikronosClientNavigation>(allLocales);
  },
});
