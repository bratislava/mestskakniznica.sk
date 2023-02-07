import { useQuery } from "react-query";
import { fetchConfig } from "./api";

export const useConfig = () => {
  const { data, isLoading, isError } = useQuery("config", {
    queryFn: fetchConfig,
    staleTime: Infinity,
  });

  return {
    config: data,
    isLoading,
    isError,
  };
};

export const useHasConfig = () => {
  const { config, isLoading, isError } = useConfig();

  return !isError && !isLoading && Boolean(config);
};

export const useConfigDefined = () => {
  const { config } = useConfig();

  if (!config) {
    throw new Error(
      "useConfigDefined has been used on a place not protected by useConfigDefined"
    );
  }

  return { config };
};
