module.exports = {
  async up(knex) {
    // You have full access to the Knex.js API with an already initialized connection to the database
    // ------------------------
    // EXAMPLE: renaming Table
    // knex.schema.renameTable('oldName', 'newName')
    // ------------------------
    // EXAMPLE: renaming column

    // column names are in snake_case even if field name is in camelCase
    knex.schema.table("basic_documents", (table) => {
      table.renameColumn("date_added", "added_at");
    });
  },
  // down(knex) {
  //   // This one isn't implemented yet, will be eventually
  // },
};
