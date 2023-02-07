import { IStrapi } from "strapi-typed";
import { AdminService } from "../../shared/types";

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
      try {
        ctx.body = await getService().putNavigation(ctx.request.body);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return ctx.badRequest(error.message);
        }

        throw error;
      }
    },
  };
};
