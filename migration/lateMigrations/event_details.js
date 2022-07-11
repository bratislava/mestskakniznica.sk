const { migrate } = require('../migrate/helpers/migrate')

// Tables that should not be proccessed later
const processedTables = []

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrate('components_sections_event_details', 'components_sections_event_details_event_locality_links',(role) => {
    const toApply={
      event_details_id: role['id'],
      event_locality_id: role['eventLocality'],
    }
    return toApply
  })
  await migrate('components_sections_event_details', 'components_sections_event_details_event_category_links',(role) => ({
    event_details_id: role['id'],
    event_category_id: role['eventCategory'],
  }))
}

module.exports = {
  processedTables,
  migrateTables,
}
