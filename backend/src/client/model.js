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
  .first()
}

  const create = async (
    name,
    phone,
    city,
    state,
    postal,
    street,
    number,
    description
  ) => {
    await knex('client').insert({
      name,
      phone,
      city,
      state,
      postal,
      street,
      number,
      description
    })
  }

  const update = async (
    id,
    name,
    phone,
    city,
    state,
    postal,
    street,
    number,
    description
  ) => {
    await knex('client').where('id', id).update({
      name,
      phone,
      city,
      state,
      postal,
      street,
      number,
      description
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