const { migrate } = require('../migrate/helpers/migrate')

// Tables that should not be proccessed later
const processedTables = []

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrate('components_homepage_registration_infos', 'components_homepage_registration_infos_redirect_to_links', (role) => ({
    registration_info_id: role.id,
    page_id: role.registrationInfoSectionRedirectTo,
  }))
}

module.exports = {
  processedTables,
  migrateTables,
}
