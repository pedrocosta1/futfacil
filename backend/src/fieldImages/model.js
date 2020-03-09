import knex from '../config/knex'

  const getAll = async ( field ) => {
    return await knex('fieldImages')
    .where('field', field)
    .andWhere('active', true)
  }


  const create = async (
    field
  ) => {
    return await knex('fieldImages').insert({
      field,
    }).returning(['id'])
  }

  const updatePhoto = async (
    id,
    photo
  ) => {
    await knex('fieldImages').where('id', id).update({
      photo
    })
  }

  const remove = (id) => {
    return knex('fieldImages').where('id', id).update({
      active: false
    })
  }

  export {
    getAll,
    create,
    updatePhoto,
    remove
  }