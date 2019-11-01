
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('rent', function(table) {
        table.increments()
        table.timestamp('date', { useTz: true })
        table.timestamp('hour_ini', { useTz: true})
        table.timestamp('hour_end', { useTz: true })
        table.decimal('price',14,2)
      }),
      knex.schema.alterTable('rent', function(table) {
        table.integer('player').unsigned()
        table.foreign('player').references('player.id').onDelete('cascade')
        table.integer('field').unsigned()
        table.foreign('field').references('field.id').onDelete('cascade')
      }) 
    ])
  }
  
  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTableIfExists('rent'),
    ])
  }
  