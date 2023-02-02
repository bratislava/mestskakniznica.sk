import React from "react";
import { Typography } from "@strapi/design-system/Typography";
import { ModalHeader, ModalLayout } from "@strapi/design-system/ModalLayout";
import { useEditAdd } from "../utils/EditAddModalProvider";
import EditAddForm from "./EditAddForm";
import { useNavigationDataDefined } from "../utils/NavigationDataProvider";
import { NavikronosRoute } from "../../../shared/types";

const EditAddModal = () => {
  const { modalData, closeModal } = useEditAdd();
  const { addRoute, editRoute } = useNavigationDataDefined();

  console.log(modalData);
  if (!modalData.open) {
    return null;
  }

  const handleSubmit = (x: NavikronosRoute) => {
    if (modalData.type === "add") {
      addRoute(modalData.locationIndexes, x);
      closeModal();
    }
    if (modalData.type === "edit") {
      editRoute(modalData.locationIndexes, x);
      closeModal();
    }
  };

  return (
    <ModalLayout onClose={closeModal}>
      <ModalHeader>
        <Typography
          variant="omega"
          fontWeight="bold"
          textColor="neutral800"
          as="h2"
          id="asset-dialog-title"
        >
          asdads
        </Typography>
      </ModalHeader>
      <EditAddForm
        initialValues={(modalData as any).defaultValues}
        onSubmit={handleSubmit}
      />
    </ModalLayout>
  );
};

export default EditAddModal;
