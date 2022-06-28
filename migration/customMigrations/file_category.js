const { migrate } = require('../migrate/helpers/migrate')

// Tables that should not be proccessed later
const processedTables = []
// const processedTables = ['file_category']

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  // await migrate('file_category', 'file_categories')
  // await migrate('file_category', 'file_categories_page_links',(role) => ({
  //   faq_section_id: role.id,
  //   page_id: role.faqSectionRedirectTo,
  // }))
}

module.exports = {
  processedTables,
  migrateTables,
}
