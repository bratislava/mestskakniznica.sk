import { Core } from '@strapi/strapi'
import { getConfig, validateConfig } from './services/helpers/config'

export default async ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase

  const config = getConfig(strapi);

  // Validation function throws an error so the app won't start.
  validateConfig(strapi, config);
};
