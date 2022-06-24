const { migrate } = require('../migrate/helpers/migrate')

// Tables that should not be proccessed later
const processedTables = []

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrate('components_menu_items_section_links', 'components_menu_items_section_links_section_link_page_links', (role) => ({
    section_links_id: role.id,
    section_link_id:role.id,
    page_id: role.sectionLinkPage,
  }))
}

module.exports = {
  processedTables,
  migrateTables,
}
