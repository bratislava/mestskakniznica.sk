import React from "react";
import NavigationTreeChild from "./NavigationTreeChild";
import { useNavigationDataDefined } from "../utils/NavigationDataProvider";
import { TextButton, Typography } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { useEditAdd } from "../utils/EditAddModalProvider";

const NavigationTree = () => {
  const { navigationData } = useNavigationDataDefined();
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
              isFirst={index === 0}
              isLast={index === navigationData!.length - 1}
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
    </div>
  );
};

export default NavigationTree;
