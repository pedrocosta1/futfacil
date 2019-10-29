
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('field', function(table) {
        table.increments()
        table.string('name')
        table.string('photo')
        table.string('type')
        table.string('size')
        table.string('max_person')
        table.decimal('price',14,2)
        table.decimal('hour_price',14,2)
      }),
      knex.schema.alterTable('field', function(table) {
        table.integer('client').unsigned()
        table.foreign('client').references('client.id').onDelete('cascade')
      }) 
    ])
  }
  
  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTableIfExists('field'),
    ])
  }
  