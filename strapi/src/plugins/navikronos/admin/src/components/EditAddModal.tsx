import React from "react";
import { ModalHeader, ModalLayout, Typography } from "@strapi/design-system";
import { useEditAdd } from "../utils/EditAddModalProvider";
import EditAddForm from "./EditAddForm";
import { useNavigationDataDefined } from "../utils/NavigationDataProvider";
import { NavikronosRoute } from "../../../shared/types";

const EditAddModal = () => {
  const { modalData, closeModal } = useEditAdd();
  const { addRoute, editRoute } = useNavigationDataDefined();

  if (!modalData.open) {
    return null;
  }

  const handleSubmit = (route: Partial<NavikronosRoute>) => {
    if (modalData.type === "add") {
      addRoute(modalData.locationIndexes, route as NavikronosRoute);
      closeModal();
    }
    if (modalData.type === "edit") {
      editRoute(modalData.locationIndexes, route as NavikronosRoute);
      closeModal();
    }
  };

  return (
    <ModalLayout onClose={closeModal} labelledBy="modal-title">
      <ModalHeader>
        <Typography
          variant="omega"
          fontWeight="bold"
          textColor="neutral800"
          as="h2"
          id="modal-title"
        >
          {modalData.type === "edit" && "Edit route"}
          {modalData.type === "add" && "Add route"}
        </Typography>
      </ModalHeader>
      <EditAddForm
        initialValues={modalData.defaultValues}
        onSubmit={handleSubmit}
      />
    </ModalLayout>
  );
};

export default EditAddModal;
