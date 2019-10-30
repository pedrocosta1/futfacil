
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('rent', function(table) {
        table.increments()
        table.string('name')
        table.string('postal')
        table.timestamp('date_ini', { useTz: true })
        table.timestamp('date_end', { useTz: true })
        table.string('hour')
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
  