import knex from '../config/knex'

const getAll = async (team) => {
  return await knex('challenge')
    .select(
      'challenge.id',
      'player.name as namePlayer',
      'team.name as teamName',
      'field.name as fieldName',
      'challenge.date'
    )
    .leftJoin('team', 'team.id', 'challenge.team1')
    .leftJoin('player', 'player.id', 'team.player')
    .leftJoin('field', 'field.id', 'challenge.field')
    .where('challenge.team2', team)
}

const get = async (id) => {
  return await knex('challenge')
  .select('client.*', 'field.name as fieldName', 'team.id as teamId')
  .leftJoin('team', 'team.id', 'challenge.team1')
  .leftJoin('field', 'field.id', 'challenge.field')
  .leftJoin('client', 'client.id', 'field.client')
  .where('challenge.id', id)
  .first()
}

  const create = async (
    team1,
    team2,
    date,
    field,
    victory,
    happend
  ) => {
    await knex('challenge').insert({
      team1,
      team2,
      date,
      field,
      victory,
      happend
    })
  }

  const updateChallenge = async (
    id,
    team
  ) => {
    await knex('challenge').where('id', id).update({
      victory: team,
      happend: true
    })
  }

  const updateAccept = async (
    id,
    accept
  ) => {
    await knex('challenge').where('id', id).update({
      accept
    })
  }

  const remove = (id) => {
    return knex('challenge').del('id', id)
  }

  export {
    getAll,
    get,
    create,
    updateAccept,
    updateChallenge,
    remove
  }