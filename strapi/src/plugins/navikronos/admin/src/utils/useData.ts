import { useQuery } from "react-query";
import { fetchNavigation, fetchNavikronosConfig } from "./api";

export const useData = () => {
  const { data: dataConfig, isLoading: isLoadingConfig } = useQuery("config", {
    queryFn: fetchNavikronosConfig,
    staleTime: Infinity,
  });

  const { data: dataNavigation, isLoading: isLoadingNavigation } = useQuery(
    "navigation",
    {
      queryFn: fetchNavigation,
      staleTime: Infinity,
    }
  );

  const isLoading = isLoadingConfig || isLoadingNavigation;

  return {
    dataConfig,
    dataNavigation,
    isLoading,
    isLoadingConfig,
    isLoadingNavigation,
  };
};
