import { Id, IStrapi, StrapiContentType, StrapiContext } from "strapi-typed";
import { getI18nStatus } from "../../admin/src/utils/getI18nStatus";

export const commonService = ({ strapi }: { strapi: IStrapi }) => ({
  async getConfig() {
    const pluginStore = await strapi.store({
      type: "plugin",
      name: "navikronos",
    });
    return await pluginStore.get<string, any>({ key: "config" });
  },
});
