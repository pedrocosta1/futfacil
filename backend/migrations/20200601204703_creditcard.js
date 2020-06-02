
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('credit_card', function(table) {
            table.increments(),
            table.string('flag'),
            table.string('name'),
            table.string('ccv'),
            table.string('validation'),
            table.string('number'),
            table.integer('player').unsigned(),
            table.foreign('player').references('player.id').onDelete('cascade')
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('player_hability'),
      ])
};
