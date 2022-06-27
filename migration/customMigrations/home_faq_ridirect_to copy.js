const { migrate } = require('../migrate/helpers/migrate')

// Tables that should not be proccessed later
const processedTables = []

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrate('components_homepage_faq_sections', 'components_homepage_faq_sections_redirect_to_links', (role) => ({
    faq_section_id: role.id,
    page_id: role.faqSectionRedirectTo,
  }))
}

module.exports = {
  processedTables,
  migrateTables,
}
