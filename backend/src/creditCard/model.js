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
    checked,
    player
  ) => {
    await knex('creditCard').insert({
      flag,
      numberCard,
      validation,
      ccv,
      name,
      default : checked,
      player
    })
  }

  const update = async (
    id,
    flag,
    numberCard,
    validation,
    ccv,
    name,
    checked
  ) => {
    await knex('creditCard').where('id', id).update({
      flag,
      numberCard,
      validation,
      ccv,
      name,
      default : checked
    })
  }

  const remove = (id) => {
    return knex('creditCard').where('id', id).del()
  }

  export {
    getAll,
    get,
    create,
    update,
    remove
  }