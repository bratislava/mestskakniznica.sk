import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    ctx.body = await strapi
      .plugin("navikronos")
      .service("myService")
      .getWelcomeMessage();
  },
});
