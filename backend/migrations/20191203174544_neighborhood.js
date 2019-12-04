
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('client', function(table) {
        table.string('neighborhood')
      }),
      knex.schema.table('player', function(table) {
        table.string('neighborhood')
      })
    ])
  }
  
exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('player', function(table) {
            table.dropColumn('neighborhood')
        }),
        knex.schema.table('client', function(table) {
            table.dropColumn('neighborhood')
        }),
    ])
}
  