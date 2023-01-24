import { IStrapi } from "strapi-typed";

// Copied from strapi-plugin-navigation/server/i18n/utils.ts

export type NavigationPluginConfig = {
  i18nEnabled: boolean;
};

type GetI18nStatusInput = {
  strapi: IStrapi;
};

type I18NStatus = {
  hasI18NPlugin: boolean;
  enabled: boolean;
  defaultLocale?: string | null;
  locales?: I18nLocale[];
};

export type I18nLocale = {
  id: number;
  name: string;
  code: string;
};

export const getI18nStatus = async ({
  strapi,
}: GetI18nStatusInput): Promise<I18NStatus> => {
  const i18nPlugin: null | any = strapi.plugin("i18n");
  const hasI18NPlugin = !!i18nPlugin;
  const pluginStore = strapi.store({
    type: "plugin",
    name: "navigation",
  });

  const config: NavigationPluginConfig = await pluginStore.get({
    key: "config",
  });
  const localeService = i18nPlugin ? i18nPlugin.service("locales") : null;
  const defaultLocale: string | undefined =
    await localeService?.getDefaultLocale();

  const locales = (await localeService.find({})) as I18nLocale[];

  return hasI18NPlugin
    ? {
        hasI18NPlugin,
        enabled: config.i18nEnabled,
        defaultLocale,
        locales,
      }
    : {
        hasI18NPlugin,
        enabled: false,
        defaultLocale: undefined,
        locales: undefined,
      };
};
