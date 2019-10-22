
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('client', function(table) {
        table.increments()
        table.string('name')
        table.string('phone')
        table.string('postal')
        table.string('state')
        table.string('city')
        table.string('street')
        table.string('number')
        table.string('description')
      }),
      knex.schema.alterTable('client', function(table) {
        table.integer('user').unsigned()
        table.foreign('user').references('user.id').onDelete('cascade')
      }) 
    ])
  }
  
  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTableIfExists('client'),
    ])
  }
  