import knex from "../config/knex"

const getAll = async () => {
  return await knex('client')
    .select(
      'id',
      'name',
      'phone',
      'city',
      'state',
      'postal',
      'street',
      'number'
    )
}
const get = async (id) => {
  return await knex('client')
  .select(
    'id',
      'name',
      'phone',
      'city',
      'state',
      'postal',
      'street',
      'number'
  )
  .where('id', id)
}

  const create = (
    name,
    phone,
    city,
    state,
    postal,
    street,
    number
  ) => {
    knex('client').insert({
      name,
      phone,
      city,
      state,
      postal,
      street,
      number
    })
  }

  const update = (
    id,
    name,
    phone,
    city,
    state,
    postal,
    street,
    number
  ) => {
    knex('client').where('id', id).update({
      name,
      phone,
      city,
      state,
      postal,
      street,
      number
    })
  }

  const remove = (id) => {
    return knex('client').del('id', id)
  }

  export {
    getAll,
    get,
    create,
    update,
    remove
  }