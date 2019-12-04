
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('player_hability', function(table) {
        table.increments()
        table.integer('pac').comment('Velocidade Ritmo')
        table.integer('shot').comment('Chute')
        table.integer('pas').comment('Passe')
        table.integer('dri').comment('Drible')
        table.integer('def').comment('Defesa')
        table.integer('phy').comment('Fisico')
        table.string('photo').comment('foto')
        table.integer('overall').comment('Media dos Atributos')
        table.string('name').comment('Nome para o card')
        table.string('nacionality').comment('Nacionalidade')
        table.string('club').comment('Clube')
      }),
      knex.schema.alterTable('player_hability', function(table) {
        table.integer('player').unsigned()
        table.foreign('player').references('player.id').onDelete('cascade')
      }) 
    ])
  }
  
  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTableIfExists('player_hability'),
    ])
  }
  