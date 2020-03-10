
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('challenge', function(table) {
            table.increments(),
            table.integer('team1').unsigned()
            table.integer('team2').unsigned()
            table.timestamp('date', true).defaultTo(knex.fn.now())
            table.integer('field').unsigned()
            table.foreign('field').references('field.id').onDelete('cascade')
            table.boolean('accept').defaultTo(false)
            table.integer('victory').unsigned()
            table.boolean('happend').defaultTo(false)
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('challenge'),
    ])
};
