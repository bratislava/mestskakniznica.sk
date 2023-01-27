import React from "react";
import NavigationTreeChild from "../NavigationTreeChild/NavigationTreeChild";
import { useNavigationData } from "../../utils/NavigationDataProvider";

const NavigationTree = () => {
  const { navigationData } = useNavigationData();

  return (
    <div>
      {navigationData?.map((child, index) => (
        <NavigationTreeChild
          key={index}
          child={child}
          locationIndexes={[index]}
        />
      ))}
    </div>
  );
};

export default NavigationTree;
