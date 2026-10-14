import { Core } from '@strapi/strapi'
import {
  NavikronosLocaleNavigations,
  NavikronosStorageContentType,
} from "../../../shared/types";

export const getNavigation = async (strapi: Core.Strapi) => {
  const navigation = (await strapi
    .query("plugin::navikronos.navikronos-storage")
    .findOne({})) as NavikronosStorageContentType | null;

  return navigation?.data ?? ({} as NavikronosLocaleNavigations);
};
