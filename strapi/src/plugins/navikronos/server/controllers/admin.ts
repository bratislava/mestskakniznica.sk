import { IStrapi } from "strapi-typed";

export const adminController = ({ strapi }: { strapi: IStrapi }) => {
  const getService = () => strapi.plugin("navikronos").service("admin");

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
