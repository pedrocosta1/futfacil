import knex from "../config/knex"

const getAll = async (client) => {
  return await knex('field')
    .select('*')
    .where('client', client)
}
const get = async (id) => {
  return await knex('field')
  .select(
      'field.id',
      'field.type',
      'field.size',
      'field.maxPerson',
      'field.price',
      'field.hourPrice',
      'client.name'
  )
  .leftJoin('client', 'client.id', 'field.client')
  .where('field.id', id)
  .first()
}

  const create = async (
    name,
    client,
    type,
    size,
    maxPerson,
    price,
    hourPrice
  ) => {
    await knex('field').insert({
      name,
      client,
      type,
      size,
      maxPerson,
      price,
      hourPrice
    })
  }

  const update = async (
    id,
    name,
    client,
    type,
    size,
    maxPerson,
    price,
    hourPrice
  ) => {
    await knex('field').where('id', id).update({
      name,
      client,
      type,
      size,
      maxPerson,
      price,
      hourPrice
    })
  }

  const remove = (id) => {
    return knex('field').del('id', id)
  }

  export {
    getAll,
    get,
    create,
    update,
    remove
  }