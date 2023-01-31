import { IStrapi } from "strapi-typed";
import { NavikronosConfig } from "../../types";

export const getConfig = (strapi: IStrapi) =>
  strapi.config.get("plugin.navikronos") as NavikronosConfig;

export const validateConfig = () => {};
