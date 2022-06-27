const { migrate } = require('../migrate/helpers/migrate')

// Tables that should not be proccessed later
const processedTables = []

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrate('components_sections_locality_services', 'components_sections_locality_services_page_links', (role) => ({
    locality_services_id: role.id,
    page_id: role.localityServicesPage,
  }))
}

module.exports = {
  processedTables,
  migrateTables,
}
