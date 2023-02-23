import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import { fetchNavigation, putNavigation } from "./api";
import {
  NavikronosEmptyRoute,
  NavikronosLocaleNavigations,
  NavikronosRoute,
  NavikronosRoutes,
} from "../../../shared/types";
import produce from "immer";
import { last } from "lodash";
import { useConfig } from "./useConfig";
import { useNotification } from "@strapi/helper-plugin";

const NavigationDataContext = createContext<{
  navigationData?: NavikronosLocaleNavigations | null;
  isLoading: boolean;
  isError: boolean;
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
} | null>(null);
const NavigationDataDispatchContext =
  createContext<React.Dispatch<NavigationDataAction> | null>(null);

export const NavigationDataProvider = ({ children }: PropsWithChildren) => {
  const [navigationData, dispatch] = useReducer(navigationDataReducer, null);

  const { data, isLoading, isError } = useQuery("navigation", {
    queryFn: fetchNavigation,
    staleTime: Infinity,
  });

  const [locale, setLocale] = useState("");

  const { config } = useConfig();

  useEffect(() => {
    if (config?.i18n?.defaultLocale) {
      setLocale(config?.i18n?.defaultLocale);
    }
  }, [config]);

  useEffect(() => {
    if (data) {
      dispatch({ type: "loaded", data });
    }
  }, [data]);

  return (
    <NavigationDataContext.Provider
      value={{ navigationData, isLoading, isError, locale, setLocale }}
    >
      <NavigationDataDispatchContext.Provider value={dispatch}>
        {children}
      </NavigationDataDispatchContext.Provider>
    </NavigationDataContext.Provider>
  );
};

interface LoadedAction {
  type: "loaded";
  data: NavikronosLocaleNavigations;
}

interface AddRouteAction {
  type: "addRoute";
  indexes: number[];
  data: NavikronosRoute;
  locale: string;
}

interface EditRouteAction {
  type: "editRoute";
  indexes: number[];
  data: NavikronosRoute;
  locale: string;
}

interface RemoveRouteAction {
  type: "removeRoute";
  indexes: number[];
  locale: string;
}

interface MoveRouteUpAction {
  type: "moveRouteUp";
  indexes: number[];
  locale: string;
}

interface MoveRouteDownAction {
  type: "moveRouteDown";
  indexes: number[];
  locale: string;
}

type NavigationDataAction =
  | LoadedAction
  | AddRouteAction
  | EditRouteAction
  | RemoveRouteAction
  | MoveRouteUpAction
  | MoveRouteDownAction;

function navigationDataReducer(
  navigationData: NavikronosLocaleNavigations | null,
  action: NavigationDataAction
) {
  if (action.type === "loaded") {
    return action.data;
  }
  if (!navigationData) {
    return null;
  }

  const editedLocale = produce(
    {
      children: navigationData[action.locale] ?? ([] as NavikronosRoutes),
    },
    (draft) => {
      switch (action.type) {
        case "addRoute": {
          let current = draft;
          action.indexes.forEach((index) => {
            // TODO
            // @ts-ignore
            current = current.children[index];
          });
          if (!current.children) {
            current.children = [action.data];
          } else {
            current.children.push(action.data);
          }
          break;
        }
        case "editRoute":
          let current = draft;
          action.indexes.slice(0, -1).forEach((index) => {
            // TODO
            // @ts-ignore
            current = current.children[index];
          });
          const lastIndex = last(action.indexes);
          // TODO
          // @ts-ignore
          current.children[lastIndex] = action.data;
          break;
        case "removeRoute": {
          let current = draft;
          action.indexes.slice(0, -1).forEach((index) => {
            // TODO
            // @ts-ignore
            current = current.children[index];
          });
          const lastIndex = last(action.indexes)!;

          // TODO
          // @ts-ignore
          const routeToRemove = current.children[lastIndex];

          if (
            routeToRemove.type !== "contentType" &&
            routeToRemove.children &&
            routeToRemove.children.length > 0
          ) {
            current.children[lastIndex] = {
              type: "empty",
              children: routeToRemove.children,
            } as NavikronosEmptyRoute;
          } else {
            current.children.splice(lastIndex, 1);
          }

          break;
        }
        case "moveRouteUp": {
          let current = draft;
          action.indexes.slice(0, -1).forEach((index) => {
            // TODO
            // @ts-ignore
            current = current.children[index];
          });
          const lastIndex = last(action.indexes)!;

          if (lastIndex === 0) {
            break;
          }
          const routeToMove = current.children[lastIndex];
          current.children[lastIndex] = current.children[lastIndex - 1];
          current.children[lastIndex - 1] = routeToMove;
          break;
        }

        case "moveRouteDown": {
          let current = draft;
          action.indexes.slice(0, -1).forEach((index) => {
            // TODO
            // @ts-ignore
            current = current.children[index];
          });
          const lastIndex = last(action.indexes)!;

          if (current.children.length <= lastIndex + 1) {
            break;
          }

          const routeToMove = current.children[lastIndex];
          current.children[lastIndex] = current.children[lastIndex + 1];
          current.children[lastIndex + 1] = routeToMove;
          break;
        }

        default: {
          throw Error("Unknown action: " + (action as { type: string }).type);
        }
      }
    }
  ).children;

  return { ...navigationData, [action.locale]: editedLocale };
}

export const useHasNavigationData = () => {
  const { isError, isLoading, navigationData } = useContext(
    NavigationDataContext
  )!;
  const dispatch = useContext(NavigationDataDispatchContext);

  return !isError && !isLoading && Boolean(navigationData) && Boolean(dispatch);
};

/**
 * To be used only on components that are displayed only when `useHasNavigationData` is `true`.
 */
export const useNavigationDataDefined = () => {
  const { navigationData, locale, setLocale } = useContext(
    NavigationDataContext
  )!;
  const toggleNotification = useNotification();
  const dispatch = useContext(NavigationDataDispatchContext);
  const { mutate, isLoading: isSaving } = useMutation(
    (newNavigationData: NavikronosLocaleNavigations) =>
      putNavigation({ navigation: newNavigationData }),
    {
      onSuccess: () => {
        toggleNotification({
          type: "success",
          message: "Navigation saved successfully.",
        });
      },
      onError: () => {
        toggleNotification({
          type: "warning",
          message: "Navigation failed to save.",
        });
      },
    }
  );

  if (!navigationData || !dispatch) {
    throw new Error(
      "useNavigationDataDefined has been used on a place not protected by useHasNavigationData"
    );
  }

  const saveNavigation = () => {
    mutate(navigationData);
  };

  const editRoute = (
    locationIndexes: number[],
    editedRoute: NavikronosRoute
  ) => {
    dispatch({
      type: "editRoute",
      indexes: locationIndexes,
      data: editedRoute,
      locale,
    });
  };

  const addRoute = (locationIndexes: number[], newRoute: NavikronosRoute) => {
    dispatch({
      type: "addRoute",
      indexes: locationIndexes,
      data: newRoute,
      locale,
    });
  };

  const removeRoute = (locationIndexes: number[]) => {
    dispatch({
      type: "removeRoute",
      indexes: locationIndexes,
      locale,
    });
  };

  const moveRouteUp = (locationIndexes: number[]) => {
    dispatch({
      type: "moveRouteUp",
      indexes: locationIndexes,
      locale,
    });
  };

  const moveRouteDown = (locationIndexes: number[]) => {
    dispatch({
      type: "moveRouteDown",
      indexes: locationIndexes,
      locale,
    });
  };

  return {
    navigationData: navigationData[locale],
    locale,
    setLocale,
    editRoute,
    addRoute,
    removeRoute,
    moveRouteUp,
    moveRouteDown,
    saveNavigation,
    isSaving,
  };
};
