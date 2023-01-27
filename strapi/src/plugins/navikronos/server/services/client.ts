import { IStrapi } from "strapi-typed";
import { FetchedEntry, fetchEntries } from "../helpers";
import {
  ClientGetNavigationResponse,
  NavikronosClientEntryRoute,
  NavikronosClientNavigation,
  NavikronosClientRoute,
  NavikronosClientRoutes,
  NavikronosNavigation,
  NavikronosRoutes,
} from "../types";

type EntriesToFetchMap = Record<string, string[]>;
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
  entriesToFetch: EntriesToFetchMap
): Promise<FetchedEntriesMap> => {
  const promises = Object.entries(entriesToFetch).map(
    ([contentTypeUid, ids]) => {
      return async () => {
        const fetched = await fetchEntries(strapi, contentTypeUid, ids);
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

export default ({ strapi }: { strapi: IStrapi }) => {
  return {
    async getNavigation(): Promise<ClientGetNavigationResponse> {
      const navigationMany = await strapi
        .query<NavikronosNavigation>(
          "api::navikronos-storage.navikronos-storage"
        )
        .findMany({});

      const navigation = navigationMany[0];

      if (!navigation) {
        return null;
      }

      const entriesToFetch = traverseGetEntriesToFetch(navigation);
      const fetchedEntries = await fetchSelectedEntries(
        strapi,
        navigation,
        entriesToFetch
      );
      return traverseReplaceEntries(navigation, fetchedEntries);
    },
  };
};
