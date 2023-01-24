import { IStrapi } from "strapi-typed";

export const adminController = ({ strapi }: { strapi: IStrapi }) => {
  const getService = () => strapi.plugin("navikronos").service("admin");

  return {
    async getAllData(ctx) {
      ctx.body = await getService().getAllData();
    },

    async getNavigation(ctx) {
      ctx.body = await getService().getNavigation();
    },

    async putNavigation(ctx) {
      ctx.body = await getService().getAllData();
    },

    async getContentTypeItems(ctx) {
      const { params, query = {} } = ctx;
      console.log(params, query);

      ctx.body = await getService().getContentTypeItems("api::page.page");
    },
  };
};
