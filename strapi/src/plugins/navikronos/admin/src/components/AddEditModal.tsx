import React from "react";
import { Typography } from "@strapi/design-system/Typography";
import { ModalHeader, ModalLayout } from "@strapi/design-system/ModalLayout";
import { useNavigationData } from "../utils/NavigationDataProvider";

const AddEditModal = () => {
  const { modalData } = useNavigationData();
  console.log(modalData);
  if (!modalData.open) {
    return null;
  }
  return (
    <ModalLayout
    // onClose={onClose}
    >
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
      {/*<CustomFieldForm*/}
      {/*  isEditForm={isEditMode}*/}
      {/*  customField={pick(*/}
      {/*    data,*/}
      {/*    "name",*/}
      {/*    "label",*/}
      {/*    "type",*/}
      {/*    "required",*/}
      {/*    "options",*/}
      {/*    "multi"*/}
      {/*  )}*/}
      {/*  onSubmit={onSubmit}*/}
      {/*  onClose={onClose}*/}
      {/*  usedCustomFieldNames={usedCustomFieldNames}*/}
      {/*/>*/}
      asdas
    </ModalLayout>
  );
};

export default AddEditModal;
