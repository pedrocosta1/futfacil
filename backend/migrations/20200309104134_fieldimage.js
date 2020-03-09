
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('field_images', function(table) {
            table.increments(),
            table.string('photo'),
            table.integer('field').unsigned()
            table.foreign('field').references('field.id').onDelete('cascade')
            table.boolean('active').defaultTo(true)
        }),
    ])
}

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('field_images'),
    ])
}
