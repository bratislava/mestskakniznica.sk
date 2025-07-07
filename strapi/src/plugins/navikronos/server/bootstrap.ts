import { IStrapi } from 'strapi-typed'
import { getConfig, validateConfig } from './services/helpers/config'

export default async ({ strapi }: { strapi: IStrapi }) => {
  // bootstrap phase

  const config = getConfig(strapi);

  // Validation function throws an error so the app won't start.
  validateConfig(strapi, config);
};
