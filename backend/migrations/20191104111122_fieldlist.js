
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('field_list', function(table) {
        table.increments()
        table.timestamp('hour_ini', { useTz: true})
        table.timestamp('hour_end', { useTz: true })
        table.string('day'),
        table.boolean('active')
      }),
      knex.schema.alterTable('field_list', function(table) {
        table.integer('field').unsigned()
        table.foreign('field').references('field.id').onDelete('cascade')
      }) 
    ])
  }
  
exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('field_list'),
    ])
}
  