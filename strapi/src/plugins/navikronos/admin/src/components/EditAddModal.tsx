import React from "react";
import { Modal } from "@strapi/design-system";
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
    <Modal.Root
      open={modalData.open}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            {modalData.type === "edit" && "Edit route"}
            {modalData.type === "add" && "Add route"}
          </Modal.Title>
        </Modal.Header>
        <EditAddForm
          initialValues={modalData.defaultValues}
          onSubmit={handleSubmit}
        />
      </Modal.Content>
    </Modal.Root>
  );
};

export default EditAddModal;
