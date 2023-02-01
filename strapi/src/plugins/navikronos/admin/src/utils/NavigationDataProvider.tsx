import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useMutation, useQuery } from "react-query";
import { fetchNavigation, putNavigation } from "./api";
import {
  NavikronosLocaleNavigations,
  NavikronosNavigation,
  NavikronosRoute,
  NavikronosRoutes,
} from "../../../types";
import produce, { original } from "immer";
import { last } from "lodash";

const NavigationDataContext = createContext<NavikronosLocaleNavigations | null>(
  null
);
const NavigationDataDispatchContext =
  createContext<React.Dispatch<NavigationDataAction> | null>(null);

export const NavigationDataProvider = ({ children }: PropsWithChildren) => {
  const [navigationData, dispatch] = useReducer(navigationDataReducer, null);

  const { data } = useQuery("navigation", {
    queryFn: fetchNavigation,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: "loaded", data });
    }
  }, [data]);

  return (
    <NavigationDataContext.Provider value={navigationData}>
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

type NavigationDataAction =
  | LoadedAction
  | AddRouteAction
  | EditRouteAction
  | RemoveRouteAction;

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
    { children: navigationData[action.locale] ?? ([] as NavikronosRoutes) },
    (draft) => {
      switch (action.type) {
        case "addRoute": {
          let current = draft;
          action.indexes.forEach((index) => {
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
            // @ts-ignore
            current = current.children[index];
          });
          const lastIndex = last(action.indexes);
          // @ts-ignore
          current.children[lastIndex] = action.data;
          break;
        case "removeRoute": {
          let current = draft;
          action.indexes.slice(0, -1).forEach((index) => {
            // @ts-ignore
            current = current.children[index];
          });
          const lastIndex = last(action.indexes);

          // @ts-ignore
          current.children.splice(lastIndex, 1);
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

export const useNavigationData = () => {
  const navigationData = useContext(NavigationDataContext);
  // TODO: REFACTOR!!
  const { isLoading } = useQuery("navigation", {
    queryFn: fetchNavigation,
    staleTime: Infinity,
  });

  return {
    navigationData,
    isLoading,
  };
};

export const useNavigationDataDefined = () => {
  const { navigationData } = useNavigationData();
  const dispatch = useContext(NavigationDataDispatchContext);
  const mutation = useMutation(
    (newNavigationData: NavikronosLocaleNavigations) =>
      putNavigation({ navigation: newNavigationData })
  );

  const locale = "en";

  if (!navigationData || !dispatch) {
    // TODO
    throw "asdas";
  }

  const saveNavigation = () => {
    mutation.mutate(navigationData);
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

  return {
    navigationData: navigationData[locale],
    editRoute,
    addRoute,
    removeRoute,
    saveNavigation,
  };
};
