const { dbV4 } = require('../config/database')

const queries = [
  `
  ALTER TABLE IF EXISTS public.components_sections_event_details
    ADD COLUMN "event_type" integer;
  `,
    `
  ALTER TABLE IF EXISTS public.components_sections_event_details_event_category_links
    ADD COLUMN "event_category_id" integer;
  `,
      `
  ALTER TABLE IF EXISTS public.components_sections_event_details_event_category_links
    ADD COLUMN "event_detail_id" integer;
  `,
    `
  ALTER TABLE IF EXISTS public.components_sections_event_details_event_locality_links
    ADD COLUMN "event_detail_id" integer;
  `,
  `
  ALTER TABLE IF EXISTS public.home_pages
  ADD COLUMN locale character varying(255) COLLATE pg_catalog."default";
  `,
    `
    ALTER TABLE IF EXISTS public.components_sections_locality_opening_hours
    ADD COLUMN "locality_section_gps" character varying(255) COLLATE pg_catalog."default";
  `,
      `
    ALTER TABLE IF EXISTS public.components_sections_locality_opening_hours
    ADD COLUMN "opening_hours_thurday_from" character varying(255) COLLATE pg_catalog."default";
  `,   
     `
    ALTER TABLE IF EXISTS public.components_sections_locality_opening_hours
    ADD COLUMN "opening_hours_thurday_to" character varying(255) COLLATE pg_catalog."default";
  `,
      `
    ALTER TABLE IF EXISTS public.components_menu_items_section_links_section_link_page_links
    ADD COLUMN "section_link_id" character varying(255) COLLATE pg_catalog."default";
  `,
  `
  ALTER TABLE IF EXISTS public.components_menu_items_sections_section_page_links
  ADD COLUMN "section_id" character varying(255) COLLATE pg_catalog."default";
`,
  `
  ALTER TABLE IF EXISTS public.file_category
  ADD COLUMN document_category integer;
`,
`
ALTER TABLE IF EXISTS public.file_category
    ADD COLUMN page integer;
`,
`
ALTER TABLE IF EXISTS public.footers
    ADD COLUMN "privacy_link" integer;
`,
,
`
ALTER TABLE IF EXISTS public.footers
    ADD COLUMN "site_map_link" integer;
`,
`
ALTER TABLE IF EXISTS public.pages
    ADD COLUMN "page_category" integer;
`,

`
ALTER TABLE IF EXISTS public.basic_documents
    ADD COLUMN "file_category" integer;
`,
`
ALTER TABLE IF EXISTS public.categories
    ADD COLUMN "parent_category" integer;
`,
`
ALTER TABLE IF EXISTS public.blog_posts
    ADD COLUMN "parent_page" integer;
`,
`
ALTER TABLE IF EXISTS public.blog_posts
    ADD COLUMN locale character varying(255) COLLATE pg_catalog."default";
`,



]

async function addAdditionalColumns() {
  for (let i = 0; i < queries.length; i++) {
    try {
      await dbV4.raw(queries[i])
    } catch (error) {
      if (!error.message.includes('already exists')) {
        console.log(error.message)
      }
    }
  }
}

module.exports = {
  addAdditionalColumns,
}
