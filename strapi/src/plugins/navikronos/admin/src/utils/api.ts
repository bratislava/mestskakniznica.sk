import { request } from "@strapi/helper-plugin";
import pluginId from "../pluginId";
import {
  AdminGetConfigResponse,
  AdminGetNavigationResponse,
  AdminPutNavigationInput,
} from "../../../server/types";

export const fetchConfig = () =>
  request(`/${pluginId}/config`, {
    method: "GET",
  }) as Promise<AdminGetConfigResponse>;

export const fetchNavigation = () =>
  request(`/${pluginId}/navigation`, {
    method: "GET",
  }) as Promise<AdminGetNavigationResponse>;

export const putNavigation = (navigation: AdminPutNavigationInput) =>
  request(`/${pluginId}/navigation`, {
    method: "PUT",
    body: navigation,
  }) as Promise<AdminGetNavigationResponse>;
