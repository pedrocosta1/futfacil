import knex from '../config/knex'

const getAll = async ( field, active ) => {
  const query = knex('fieldList').where('field', field)
  if(!active) query.where('active', active)
  return await query
}
const get = async (id) => {
  return await knex('fieldList')
  .select('*')
  .where('id', id)
  .first()
}

  const create = async (
    field,
    hourIni,
    hourEnd,
    day,
    active
  ) => {
    await knex('fieldList').insert({
      field,
      hourIni,
      hourEnd,
      day,
      active
    })
  }

  const update = async (
    id,
    field,
    hourIni,
    hourEnd,
    day,
    active
  ) => {
    await knex('fieldList').where('id', id).update({
      field,
      hourIni,
      hourEnd,
      day,
      active
    })
  }

  const remove = (id) => {
    return knex('fieldList').del('id', id)
  }

  export {
    getAll,
    get,
    create,
    update,
    remove
  }