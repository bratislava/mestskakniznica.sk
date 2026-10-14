import { Core } from '@strapi/strapi'
import { ClientService } from "../../shared/types";

export default ({ strapi }: { strapi: Core.Strapi }) => {
  const getService = () =>
    strapi.plugin("navikronos").service("client") as ClientService;

  return {
    async getNavigation(ctx) {
      ctx.body = await getService().getNavigation();
    },
  };
};
