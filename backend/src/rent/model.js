import knex from "../config/knex"

const getAll = async (field) => {
  return await knex('rent')
    .select('rent.*', 'field.*')
    .leftJoin('field', 'field.id', 'rent.field')
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