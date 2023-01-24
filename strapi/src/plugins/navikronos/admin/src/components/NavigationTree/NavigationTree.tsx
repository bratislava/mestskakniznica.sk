// @ts-nocheck
import React from "react";
import { useData } from "../../utils/useData";
import NavigationTreeChild from "../NavigationTreeChild/NavigationTreeChild";

const NavigationTree = () => {
  const { dataNavigation } = useData();

  return (
    <div>
      {dataNavigation?.map((a) => (
        <NavigationTreeChild child={a} />
      ))}
    </div>
  );
};

export default NavigationTree;
