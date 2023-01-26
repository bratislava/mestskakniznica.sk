import React from "react";
import { Typography } from "@strapi/design-system/Typography";
import { ModalHeader, ModalLayout } from "@strapi/design-system/ModalLayout";
import { useNavigationData } from "../utils/NavigationDataProvider";
import { useEditAddModal } from "../utils/EditAddModalProvider";
import AddEditForm from "./AddEditForm";

const AddEditModal = () => {
  const { modalData, closeModal } = useEditAddModal();

  console.log(modalData);
  if (!modalData.open) {
    return null;
  }

  const handleSubmit = (x: any) => {
    console.log(x);
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
      <AddEditForm
        initialValues={(modalData as any).defaultValues}
        onSubmit={handleSubmit}
      />
    </ModalLayout>
  );
};

export default AddEditModal;
