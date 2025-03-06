import {
  AdminConfig,
  NavikronosContentTypeRoute,
  NavikronosNavigation,
} from "../../../shared/types";
import { isEqual } from "lodash";

export type NavigationTreeError =
  | {
      type: "nonexistentStaticRoute";
      id: string;
    }
  | {
      type: "nonSingularContentTypeRoute";
      uid: string;
    }
  | {
      type: "nonexistentContentTypeRoute";
      uid: string;
    }
  | {
      type: "nonexistentEntryRouteContentType";
      uid: string;
    }
  | {
      type: "nonexistentEntryRouteEntry";
      uid: string;
      id: number;
    }
  | {
      type: "duplicateContentTypeRoute";
      uid: string;
    }
  | {
      type: "duplicateStaticRoute";
      id: string;
    }
  | {
      type: "duplicateEntryRoute";
      uid: string;
      id: number;
    };

/**
 * Non-structurally validates the navigation.
 *
 * Errors checked here are dynamic (they can occur in time e.g. by unpublishing a page), therefore those are not required
 * for successful save of the navigation and, they are only validated in admin. Also, requiring them to be fixed would
 * force the users to fix the errors in someone else's work. Not fixing them leads only to "unexpected behavior".
 */
export const validateNavigation = (
  navigation: NavikronosNavigation | undefined,
  locale: string,
  config: AdminConfig,
) => {
  const errors = checkForErrorsInner(navigation, locale, config);
  const duplicates = checkForDuplicatesInner(navigation, locale);

  return [
    ...errors,
    ...duplicates.static.map(
      (id) =>
        ({
          type: "duplicateStaticRoute",
          id,
        }) as NavigationTreeError,
    ),
    ...duplicates.entry.map(
      ([uid, id]) =>
        ({
          type: "duplicateEntryRoute",
          uid,
          id,
        }) as NavigationTreeError,
    ),
    ...duplicates.contentType.map(
      (uid) =>
        ({
          type: "duplicateContentTypeRoute",
          uid,
        }) as NavigationTreeError,
    ),
  ];
};

const checkForErrorsInner = (
  navigation: NavikronosNavigation | undefined,
  locale: string,
  config: AdminConfig,
  errors: NavigationTreeError[] = [],
) => {
  if (!navigation) {
    return errors;
  }

  navigation.forEach((route) => {
    if (route.type === "static") {
      if (!config.staticRouteIds.includes(route.id)) {
        errors.push({
          type: "nonexistentStaticRoute",
          id: route.id,
        });
      }
    }

    if (route.type === "contentType") {
      if (
        !config.contentTypeRoutes.find(
          (routeConfig) => routeConfig.contentTypeUid === route.contentTypeUid,
        )
      ) {
        errors.push({
          type: "nonexistentContentTypeRoute",
          uid: route.contentTypeUid,
        });
      }
    }

    if (route.type === "entry") {
      const contentType =
        config.entryRouteEntries?.[locale]?.[route.contentTypeUid];
      if (!contentType) {
        errors.push({
          type: "nonexistentEntryRouteContentType",
          uid: route.contentTypeUid,
        });
      }
      if (
        contentType &&
        !contentType.find((routeConfig) => routeConfig.id === route.entryId)
      ) {
        errors.push({
          type: "nonexistentEntryRouteEntry",
          uid: route.contentTypeUid,
          id: route.entryId,
        });
      }
    }

    if (route.type !== "contentType") {
      checkForErrorsInner(route.children, locale, config, errors);
    }
  });

  const contentTypeRoute = navigation.find(
    (route) => route.type === "contentType",
  ) as NavikronosContentTypeRoute;
  if (contentTypeRoute && navigation.length > 1) {
    errors.push({
      type: "nonSingularContentTypeRoute",
      uid: contentTypeRoute.contentTypeUid,
    });
  }

  return errors;
};

const checkForDuplicatesInner = (
  navigation: NavikronosNavigation | undefined,
  locale: string,
  entrySet: [string, number][] = [],
  staticSet = new Set<string>(),
  contentTypeSet = new Set<string>(),
  duplicates: {
    entry: [string, number][];
    contentType: string[];
    static: string[];
  } = {
    entry: [],
    contentType: [],
    static: [],
  },
) => {
  if (!navigation) {
    return duplicates;
  }

  navigation.forEach((route) => {
    if (route.type === "entry") {
      const setValue = [route.contentTypeUid, route.entryId] as [
        string,
        number,
      ];
      if (entrySet.find((entry) => isEqual(setValue, entry))) {
        duplicates.entry.push(setValue);
      } else {
        entrySet.push(setValue);
      }
    }
    if (route.type === "contentType") {
      const { contentTypeUid } = route;
      if (contentTypeSet.has(contentTypeUid)) {
        duplicates.contentType.push(contentTypeUid);
      } else {
        contentTypeSet.add(contentTypeUid);
      }
    }
    if (route.type === "static") {
      const { id } = route;
      if (staticSet.has(id)) {
        duplicates.static.push(id);
      } else {
        staticSet.add(id);
      }
    }

    if (route.type !== "contentType") {
      checkForDuplicatesInner(
        route.children,
        locale,
        entrySet,
        staticSet,
        contentTypeSet,
        duplicates,
      );
    }
  });

  return duplicates;
};
