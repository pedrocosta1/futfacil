
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('rent', function(table) {
        table.string('day')
      }),
    ])
  }
  
exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('rent', function(table) {
            table.dropColumn('day')
        })
    ])
}
  