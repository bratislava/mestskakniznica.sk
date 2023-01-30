import React from "react";
import NavigationTreeChild from "../NavigationTreeChild/NavigationTreeChild";
import { useNavigationDataDefined } from "../../utils/NavigationDataProvider";
import { Typography } from "@strapi/design-system/Typography";
import { Plus } from "@strapi/icons";
import { TextButton } from "@strapi/design-system/TextButton";
import { useEditAdd } from "../../utils/EditAddModalProvider";

const NavigationTree = () => {
  const { navigationData, saveNavigation } = useNavigationDataDefined();
  const hasChildren = (navigationData?.length ?? 0) > 0;
  const { openAddModal } = useEditAdd();

  return (
    <div>
      {hasChildren && (
        <>
          {navigationData?.map((child, index) => (
            <NavigationTreeChild
              key={index}
              child={child}
              locationIndexes={[index]}
            />
          ))}
        </>
      )}
      <TextButton
        startIcon={<Plus />}
        onClick={() => {
          openAddModal([]);
        }}
      >
        <Typography variant="pi" fontWeight="bold" textColor={"primary600"}>
          Add child
        </Typography>
      </TextButton>
      <TextButton
        startIcon={<Plus />}
        onClick={() => {
          saveNavigation();
        }}
      >
        <Typography variant="pi" fontWeight="bold" textColor={"primary600"}>
          Save
        </Typography>
      </TextButton>
    </div>
  );
};

export default NavigationTree;
