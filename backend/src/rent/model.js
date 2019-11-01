import knex from "../config/knex"

const getAll = async (player) => {
  return await knex('rent')
    .select(
      'rent.date', 
      'rent.hourIni',
      'rent.hourEnd',
      'rent.price',
      'client.name'
    )
    .leftJoin('field', 'field.id', 'rent.field')
    .leftJoin('client', 'client.id', 'field.client')
    .where('rent.player', player)
}
const get = async (id) => {
  return await knex('rent')
  .select('*')
  .where('id', id)
  .first()
}

  const create = async (
    player,
    field,
    price,
    date,
    hourIni,
    hourEnd
  ) => {
    await knex('rent').insert({
      player,
      field,
      price,
      date,
      hourIni,
      hourEnd
    })
  }

  const update = async (
    id,
    player,
    field,
    price,
    date,
    hourIni,
    hourEnd
  ) => {
    await knex('rent').where('id', id).update({
      player,
      field,
      price,
      date,
      hourIni,
      hourEnd
    })
  }

  const remove = (id) => {
    return knex('rent').del('id', id)
  }

  export {
    getAll,
    get,
    create,
    update,
    remove
  }