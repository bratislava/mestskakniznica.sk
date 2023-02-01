import { IStrapi } from "strapi-typed";
import { last } from "lodash";

const symbol = Symbol("adsas");
export default async ({ strapi }: { strapi: IStrapi }) => {
  // const x = (await strapi.query("api::page.page").findMany({})) as any[];
  //
  // for (let a of x) {
  //   if (a.slug) {
  //     const s = a.slug.split("/");
  //     const newSlug = last(s);
  //     console.log(newSlug);
  //     await strapi
  //       .query("api::page.page")
  //       .update({ where: { id: a.id } as any, data: { newSlug } });
  //   }
  // }
  // strapi
  //   .query("api::page.page")
  //   .update({ where: { id: 68 } as any, data: { newSlug: "xxx" } });
  // console.log(x);
  // Convert pages to
  // const x = (await strapi
  //   .query("api::page.page")
  //   .findMany({ where: { locale: "en" } as any })) as any[];
  //
  // const gg = [];
  //
  // x.map((a) => {
  //   return { ...a, slug: a.slug.split("/") };
  // })
  //   .sort((a, b) => a.slug.length - b.slug.length)
  //   .forEach((a) => {
  //     let current = gg;
  //     console.log(a.slug);
  //
  //     a.slug.slice(0, -1).forEach((s) => {
  //       // @ts-ignore
  //       current = current.find((a) => a[symbol] === s).children;
  //     });
  //     if (!current.find((a) => a[symbol] === a.newSlug)) {
  //       current.push({
  //         type: "entry",
  //         contentTypeUid: "api::page.page",
  //         entryId: a.id,
  //         [symbol]: a.newSlug,
  //         children: [],
  //       });
  //     }
  //   });
  //
  // console.log(JSON.stringify(gg, null, 2));
};
