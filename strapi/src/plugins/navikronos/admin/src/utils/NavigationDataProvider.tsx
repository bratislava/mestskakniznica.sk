import React, {
  useReducer,
  PropsWithChildren,
  useEffect,
  createContext,
  useContext,
  useState,
} from "react";
import { useQuery } from "react-query";
import { fetchNavigation } from "./api";
import { Navigation } from "../../../server/types";

type ModalData =
  | { open: false }
  | { open: true; type: "edit" | "add"; location: number[] };

const NavigationDataContext = createContext<Navigation | null>(null);
const NavigationDataDispatchContext =
  createContext<React.Dispatch<Navigation> | null>(null);
const ModalContext = createContext<{
  modalData: ModalData;
  setModalData: React.Dispatch<React.SetStateAction<ModalData>>;
} | null>(null); // TODO: type

export const NavigationDataProvider = ({ children }: PropsWithChildren) => {
  const [navigationData, dispatch] = useReducer(navigationDataReducer, null);
  const [modalData, setModalData] = useState<ModalData>({ open: false });

  console.log("navigationData", navigationData);
  const { data, isLoading } = useQuery("navigation", {
    queryFn: fetchNavigation,
    staleTime: Infinity,
    onSuccess: (data) => {
      dispatch({ type: "initial", data });
    },
  });

  return (
    <ModalContext.Provider value={{ modalData, setModalData }}>
      <NavigationDataContext.Provider value={navigationData}>
        <NavigationDataDispatchContext.Provider value={dispatch}>
          {children}
        </NavigationDataDispatchContext.Provider>
      </NavigationDataContext.Provider>
    </ModalContext.Provider>
  );
};

function navigationDataReducer(navigationData, action) {
  debugger;
  switch (action.type) {
    case "initial": {
      return action.data;
    }
    case "add": {
    }
    case "edit": {
    }
    // case "changed": {
    //   return navigationData.map((t) => {
    //     if (t.id === action.task.id) {
    //       return action.task;
    //     } else {
    //       return t;
    //     }
    //   });
    // }
    // case "deleted": {
    //   return navigationData.filter((t) => t.id !== action.id);
    // }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const useNavigationData = () => {
  const data = useContext(NavigationDataContext);

  const { modalData, setModalData } = useContext(ModalContext)!;

  const openAddModal = () => {
    setModalData({ open: true, type: "add", location: [] });
  };

  console.log(openAddModal);

  console.log("xontet", data);

  return { data, openAddModal, modalData };
};
