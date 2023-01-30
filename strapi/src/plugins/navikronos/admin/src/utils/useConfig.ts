import { useQuery } from "react-query";
import { fetchConfig } from "./api";

export const useConfig = () => {
  const { data, isLoading } = useQuery("config", {
    queryFn: fetchConfig,
    staleTime: Infinity,
  });

  return {
    config: data,
    isLoading,
  };
};

export const useConfigDefined = () => {
  const { config } = useConfig();

  if (!config) {
    // TODO msg
    throw new Error("");
  }

  return config;
};
