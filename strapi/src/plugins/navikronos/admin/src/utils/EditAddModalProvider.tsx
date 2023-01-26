import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useNavigationData } from "./NavigationDataProvider";
import { NavikronosRoute, NavikronosRoutes } from "../../../server/types";

type EditAddModalData =
  | { open: false }
  | { open: true; type: "add"; locationIndexes: number[] }
  | {
      open: true;
      type: "edit";
      locationIndexes: number[];
      defaultValues: NavikronosRoute;
    };

const EditAddModalContext = createContext<{
  modalData: EditAddModalData;
  setModalData: React.Dispatch<React.SetStateAction<EditAddModalData>>;
} | null>(null); // TODO: type

export const EditAddModalProvider = ({ children }: PropsWithChildren) => {
  const [modalData, setModalData] = useState<EditAddModalData>({ open: false });

  return (
    <EditAddModalContext.Provider value={{ modalData, setModalData }}>
      {children}
    </EditAddModalContext.Provider>
  );
};

export const useEditAddModal = () => {
  const { modalData, setModalData } = useContext(EditAddModalContext)!;
  const { data } = useNavigationData();

  const openAddModal = (locationIndexes: number[]) => {
    setModalData({ open: true, type: "add", locationIndexes });
  };

  const openEditModal = (locationIndexes: number[]) => {
    let defaultValues: NavikronosRoute | { children: NavikronosRoutes } = {
      children: data as NavikronosRoutes,
    };
    locationIndexes.forEach((index) => {
      if (!defaultValues) {
        return;
      }
      // @ts-ignore
      defaultValues = defaultValues?.children[index] as NavikronosRoute;
    });

    if (!defaultValues) {
      return;
    }

    setModalData({
      open: true,
      type: "edit",
      locationIndexes,
      defaultValues: defaultValues as NavikronosRoute,
    });
  };

  const closeModal = () => {
    setModalData({ open: false });
  };

  return { modalData, openAddModal, openEditModal, closeModal };
};
