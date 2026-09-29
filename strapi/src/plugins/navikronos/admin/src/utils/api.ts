import { getFetchClient } from "@strapi/strapi/admin";
import pluginId from "../pluginId";
import {
  AdminGetConfigResponse,
  AdminGetNavigationResponse,
  AdminPutNavigationInput,
} from "../../../shared/types";

export const fetchConfig = async () => {
  const { get } = getFetchClient();
  const { data } = await get<AdminGetConfigResponse>(`/${pluginId}/config`);

  return data;
};

export const fetchNavigation = async () => {
  const { get } = getFetchClient();
  const { data } = await get<AdminGetNavigationResponse>(
    `/${pluginId}/navigation`,
  );

  return data;
};

export const putNavigation = async ({ navigation }: AdminPutNavigationInput) => {
  const { put } = getFetchClient();
  const { data } = await put<AdminGetNavigationResponse>(
    `/${pluginId}/navigation`,
    { navigation },
  );

  return data;
};
