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
    dataIni,
    dataFinal,
    hour
  ) => {
    await knex('rent').insert({
      player,
      field,
      price,
      dataIni,
      dataFinal,
      hour
    })
  }

  const update = async (
    id,
    player,
    field,
    price,
    dataIni,
    dataFinal,
    hour
  ) => {
    await knex('rent').where('id', id).update({
      player,
      field,
      price,
      dataIni,
      dataFinal,
      hour
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