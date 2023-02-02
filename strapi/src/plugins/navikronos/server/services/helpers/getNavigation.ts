import { IStrapi } from "strapi-typed";
import {
  NavikronosLocaleNavigations,
  NavikronosStorageContentType,
} from "../../../shared/types";

export const getNavigation = async (strapi: IStrapi) => {
  const navigation = await strapi
    .query<NavikronosStorageContentType>(
      "plugin::navikronos.navikronos-storage"
    )
    .findOne({});

  // TODO locale fix

  return navigation?.data ?? ({} as NavikronosLocaleNavigations);
};
