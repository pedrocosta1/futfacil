import knex from '../config/knex'

const getAll = async () => {
  return await knex('player')
    .select(
      'id',
      'name',
      'phone',
      'city',
      'state',
      'postal',
      'street',
      'neighborhood',
      'number'
    )
}
const get = async (id) => {
  return await knex('player')
  .select(
      'id',
      'name',
      'phone',
      'city',
      'state',
      'postal',
      'street',
      'neighborhood',
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
    neighborhood,
    description
  ) => {
    await knex('player').insert({
      name,
      phone,
      city,
      state,
      postal,
      street,
      number,
      neighborhood,
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
    neighborhood,
    description
  ) => {
    await knex('player').where('id', id).update({
      name,
      phone,
      city,
      state,
      postal,
      street,
      number,
      neighborhood,
      description
    })
  }

  const remove = (id) => {
    return knex('player').del('id', id)
  }

  export {
    getAll,
    get,
    create,
    update,
    remove
  }