import { IStrapi } from "strapi-typed";
import { AdminService } from "../types";

export default ({ strapi }: { strapi: IStrapi }) => {
  const getService = () =>
    strapi.plugin("navikronos").service("admin") as AdminService;

  return {
    async getConfig(ctx) {
      ctx.body = await getService().getConfig();
    },

    async getNavigation(ctx) {
      ctx.body = await getService().getNavigation();
    },

    async putNavigation(ctx) {
      ctx.body = await getService().putNavigation(ctx.request.body);
    },
  };
};
