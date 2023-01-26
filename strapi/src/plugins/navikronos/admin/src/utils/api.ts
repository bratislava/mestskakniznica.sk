import { request } from "@strapi/helper-plugin";
import pluginId from "../pluginId";
import { NavikronosNavigation } from "../../../server/types";

export const fetchNavikronosConfig = () =>
  request(`/${pluginId}/allData`, { method: "GET" });

export const fetchNavigation = () =>
  request(`/${pluginId}/navigation`, {
    method: "GET",
  }) as Promise<NavikronosNavigation>;

export const fetchContentTypeEntries = (
  contentType: string,
  locale?: string
) => {
  const queryParams = new URLSearchParams();
  if (locale) {
    queryParams.append("locale", locale);
  }

  return request(
    `/${pluginId}/content-type-items/${contentType}?${queryParams.toString()}`,
    {
      method: "GET",
    }
  );
};

// // export const updateNavikronosConfig = ({ body }: { body: NavikronosPluginConfig }) =>
// //   request(`/${pluginId}/config`, { method: 'PUT', body }, true);
//
// export const restoreNavikronosConfig = () =>
//   request(`/${pluginId}/config`, { method: "DELETE" }, true);
//
// export const fetchAllContentTypes = async () =>
//   request("/content-manager/content-types", { method: "GET" }).then(
//     prop("data")
//   );
