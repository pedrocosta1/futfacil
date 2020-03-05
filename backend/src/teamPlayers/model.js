import knex from "../config/knex"

const getAll = async (team) => {
  return await knex('teamPlayers')
  .select('teamPlayers.*', 'player.name','playerHability.overall')
  .leftJoin('player', 'player.id', 'teamPlayers.player')
  .leftJoin('playerHability', 'playerHability.player', 'player.id')
  .where('teamPlayers.active', true)
  .andWhere('teamPlayers.team', team)
}
const get = async (id) => {
  return await knex('teamPlayers')
  .select(
    'teamPlayers.*',
    'player.name',
    'player.phone'
  )
  .leftJoin('player', 'player.id', 'teamPlayers.player')
  .where('teamPlayers.id', id)
  .first()
}

const remove = (id, active) => {
  return knex('teamPlayers').where('id', id).update({
    active
  })
}

export {
  getAll,
  get,
  remove
}