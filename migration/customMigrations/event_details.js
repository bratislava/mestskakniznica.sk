const { migrate } = require('../migrate/helpers/migrate')

// Tables that should not be proccessed later
const processedTables = []

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrate('components_sections_event_details__event_tags', 'components_sections_event_details_event_tags_links',(role) => ({
    event_details_id: role['components_sections_event_detail_id'],
    event_tag_id: role['event-tag_id'],
  }))

}

module.exports = {
  processedTables,
  migrateTables,
}
