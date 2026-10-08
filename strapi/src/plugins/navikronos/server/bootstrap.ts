import { Core } from '@strapi/strapi'
import { getConfig, validateConfig } from './services/helpers/config'
import { migrateEntryIdsToDocumentIds } from './services/helpers/migrateEntryIdsToDocumentIds'

export default async ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase

  const config = getConfig(strapi);

  // Validation function throws an error so the app won't start.
  validateConfig(strapi, config);

  await migrateEntryIdsToDocumentIds(strapi);
};
