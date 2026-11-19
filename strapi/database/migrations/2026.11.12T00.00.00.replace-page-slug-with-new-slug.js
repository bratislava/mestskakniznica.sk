'use strict'

/**
 * Page: `newSlug` (the last path segment, used by the parentPage navigation) becomes `slug`. The legacy `slug` (the full
 * Navikronos path, e.g. "zazite/podujatia") is dropped, page URLs are built from the parentPage tree.
 *
 * Strapi runs migrations before it syncs the database schema. Without this migration the sync would keep the legacy
 * values in `slug` and drop `new_slug` together with its data.
 *
 * Skipped on a database without `new_slug`, e.g. a new empty one (Strapi creates the tables only after migrations).
 *
 * Strapi reads migrations from <app root>/database/migrations, not from dist, so the Dockerfile copies this folder.
 */
module.exports = {
  async up(knex) {
    const schema = () => strapi.db.getSchemaConnection(knex)

    if (!(await schema().hasColumn('pages', 'new_slug'))) {
      return
    }

    await schema().alterTable('pages', (table) => {
      table.dropColumn('slug')
    })
    await schema().alterTable('pages', (table) => {
      table.renameColumn('new_slug', 'slug')
    })
  },
}
