
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('team', function(table) {
      table.increments(),
      table.string('name'),
      table.string('logo'),
      table.boolean('active').defaultTo(true)
      table.integer('player').unsigned()
      table.foreign('player').references('player.id').onDelete('cascade')
    }),
    knex.schema.createTable('team_players', function(table) {
        table.increments(),
        table.integer('player').unsigned()
        table.foreign('player').references('player.id').onDelete('cascade')
        table.integer('team').unsigned()
        table.foreign('team').references('team.id').onDelete('cascade')
        table.boolean('active').defaultTo(true)
    }),
    knex.schema.createTable('team_accept', function(table) {
        table.increments(),
        table.integer('player').unsigned()
        table.foreign('player').references('player.id').onDelete('cascade')
        table.integer('team').unsigned()
        table.foreign('team').references('team.id').onDelete('cascade')
        table.boolean('active').defaultTo(true)
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('team_accept'),
    knex.schema.dropTableIfExists('team_players'),
    knex.schema.dropTableIfExists('team')
  ])
}
