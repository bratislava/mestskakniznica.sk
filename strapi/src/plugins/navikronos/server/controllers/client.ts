import { IStrapi } from "strapi-typed";
import { ClientService } from "../types";

export default ({ strapi }: { strapi: IStrapi }) => {
  const getService = () =>
    strapi.plugin("navikronos").service("client") as ClientService;

  return {
    async getNavigation(ctx) {
      ctx.body = await getService().getNavigation();
    },
  };
};
