import { useQuery } from "react-query";
import { fetchNavigation, fetchNavikronosConfig } from "./api";
import { Navigation } from "../../../server/types";
import { createContext, useContext } from "react";

export const useData = () => {
  const { data, isLoading } = useQuery("config", {
    queryFn: fetchNavikronosConfig,
    staleTime: Infinity,
  });

  return {
    data,
    isLoading,
  };
};
