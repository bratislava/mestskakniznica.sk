import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useQuery } from "react-query";
import { fetchNavigation } from "./api";
import { NavikronosNavigation, NavikronosRoute } from "../../../server/types";
import produce from "immer";
import { last } from "lodash";

const NavigationDataContext = createContext<NavikronosNavigation | null>(null);
const NavigationDataDispatchContext =
  createContext<React.Dispatch<NavigationDataAction> | null>(null);

export const NavigationDataProvider = ({ children }: PropsWithChildren) => {
  const [navigationData, dispatch] = useReducer(navigationDataReducer, null);

  console.log("navigationData", navigationData);
  const { data, isLoading } = useQuery("navigation", {
    queryFn: fetchNavigation,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: "initial", data });
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

interface InitialAction {
  type: "initial";
  data: NavikronosNavigation;
}

interface AddRouteAction {
  type: "addRoute";
  indexes: number[];
  data: NavikronosRoute;
}

interface EditRouteAction {
  type: "editRoute";
  indexes: number[];
  data: NavikronosRoute;
}

interface RemoveRouteAction {
  type: "removeRoute";
  indexes: number[];
}

type NavigationDataAction =
  | InitialAction
  | AddRouteAction
  | EditRouteAction
  | RemoveRouteAction;

function navigationDataReducer(
  navigationData: NavikronosNavigation | null,
  action: NavigationDataAction
) {
  if (action.type === "initial") {
    return action.data;
  }
  if (!navigationData) {
    return null;
  }

  return produce({ children: navigationData }, (draft) => {
    switch (action.type) {
      case "addRoute": {
        let current = draft;
        action.indexes.forEach((index) => {
          // @ts-ignore
          current = current.children[index];
        });
        current.children.push(action.data);
        break;
      }
      case "editRoute":
        let current = draft;
        action.indexes.splice(-1).forEach((index) => {
          // @ts-ignore
          current = current.children[index];
        });
        const lastIndex = last(action.indexes) as number;
        current.children[lastIndex] = action.data;
        break;
      case "removeRoute": {
        let current = draft;
        action.indexes.slice(0, -1).forEach((index) => {
          // @ts-ignore
          current = current.children[index];
        });
        const lastIndex = last(action.indexes) as number;
        current.children.splice(lastIndex, 1);
        break;
      }
      default: {
        throw Error("Unknown action: " + (action as { type: string }).type);
      }
    }
  }).children;
}

export const useNavigationData = () => {
  const navigationData = useContext(NavigationDataContext);
  const dispatch = useContext(NavigationDataDispatchContext) as any;

  const editRoute = (
    locationIndexes: number[],
    editedRoute: NavikronosRoute
  ) => {
    dispatch({
      type: "editRoute",
      indexes: locationIndexes,
      data: editedRoute,
    } as any);
  };

  const addRoute = (locationIndexes: number[], newRoute: NavikronosRoute) => {
    dispatch({
      type: "addRoute",
      indexes: locationIndexes,
      data: newRoute,
    } as any);
  };

  const removeRoute = (locationIndexes: number[]) => {
    dispatch({ type: "removeRoute", indexes: locationIndexes });
  };

  return { navigationData, editRoute, addRoute, removeRoute };
};
