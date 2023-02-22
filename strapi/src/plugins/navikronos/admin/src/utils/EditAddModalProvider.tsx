import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useNavigationDataDefined } from "./NavigationDataProvider";
import { NavikronosRoute, NavikronosRoutes } from "../../../shared/types";

type EditAddData =
  | { open: false }
  | {
      open: true;
      type: "add";
      locationIndexes: number[];
      defaultValues: Partial<NavikronosRoute>;
    }
  | {
      open: true;
      type: "edit";
      locationIndexes: number[];
      defaultValues: Partial<NavikronosRoute>;
    };

const EditAddContext = createContext<{
  modalData: EditAddData;
  setModalData: React.Dispatch<React.SetStateAction<EditAddData>>;
} | null>(null);

export const EditAddModalProvider = ({ children }: PropsWithChildren) => {
  const [modalData, setModalData] = useState<EditAddData>({ open: false });

  return (
    <EditAddContext.Provider value={{ modalData, setModalData }}>
      {children}
    </EditAddContext.Provider>
  );
};

export const useEditAdd = () => {
  const { modalData, setModalData } = useContext(EditAddContext)!;
  const { navigationData } = useNavigationDataDefined();

  const openAddModal = (locationIndexes: number[]) => {
    setModalData({
      open: true,
      type: "add",
      locationIndexes,
      defaultValues: {} as Partial<NavikronosRoute>,
    });
  };

  const openEditModal = (locationIndexes: number[]) => {
    let defaultValues: NavikronosRoute | { children: NavikronosRoutes } = {
      children: navigationData as NavikronosRoutes,
    };
    locationIndexes.forEach((index) => {
      if (!defaultValues) {
        return;
      }
      // TODO
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
