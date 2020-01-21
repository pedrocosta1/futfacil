import knex from '../config/knex'

const getAll = async () => {
    return await knex('log')
  }

export {
    getAll
}