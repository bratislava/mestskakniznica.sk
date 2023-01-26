// @ts-nocheck
import React from "react";
import { useData } from "../../utils/useData";
import NavigationTreeChild from "../NavigationTreeChild/NavigationTreeChild";
import { useNavigationData } from "../../utils/NavigationDataProvider";

const NavigationTree = () => {
  const { data } = useNavigationData();

  return (
    <div>
      {data?.map((child, index) => (
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
