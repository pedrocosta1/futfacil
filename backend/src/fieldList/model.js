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

  const getRentedFields = async (id) => {
    return await knex('field')
    .select(
      'fieldList.id',
      'field.name',
      'fieldList.day',
      'fieldList.hour_ini',
      'fieldList.hour_end'
    )
    .leftJoin('fieldList', 'fieldList.field', 'field.id')
    .leftJoin('client', 'client.id', 'field.client')
    .where('client.id', id)
    .andWhere('fieldList.active', true)
  }

  const getRentedDetails = async (id) => {
    return await knex('player')
    .select(
      'player.*',
      'rent.price',
    )
    .leftJoin('rent', 'rent.player', 'player.id')
    .leftJoin('field', 'field.id', 'rent.field')
    .leftJoin('fieldList', 'fieldList.field', 'field.id')
    .where('fieldList.active', true)
    .andWhere('fieldList.id', id)
    .groupBy('fieldList.id')
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
    getRentedFields,
    getRentedDetails,
    create,
    update,
    remove
  }