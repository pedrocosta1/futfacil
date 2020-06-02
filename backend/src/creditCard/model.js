import knex from "../config/knex"

const getAll = async (player) => {
  return await knex('creditCard')
    .where('player', player)
}
const get = async (id) => {
  return await knex('creditCard')
  .where('creditCard.id', id)
  .first()
}

  const create = async (
    flag,
    numberCard,
    validation,
    ccv,
    name,
    player
  ) => {
    await knex('creditCard').insert({
      flag,
      numberCard,
      validation,
      ccv,
      name,
      player
    })
  }

  const update = async (
    id,
    flag,
    numberCard,
    validation,
    ccv,
    name
  ) => {
    await knex('creditCard').where('id', id).update({
      flag,
      numberCard,
      validation,
      ccv,
      name
    })
  }

  const remove = (id) => {
    return knex('creditCard').del('id', id)
  }

  export {
    getAll,
    get,
    create,
    update,
    remove
  }