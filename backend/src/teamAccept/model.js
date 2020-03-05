import knex from "../config/knex"

const getAll = async (team) => {
  return await knex('teamAccept')
  .select('teamAccept.*', 'player.name','playerHability.overall')
  .leftJoin('player', 'player.id', 'teamAccept.player')
  .leftJoin('playerHability', 'playerHability.player', 'player.id')
  .where('teamAccept.active', false)
  .andWhere('teamAccept.team', team)
}
const get = async (id) => {
  return await knex('teamAccept')
  .select(
    'teamAccept.*',
    'player.name',
    'player.phone'
  )
  .leftJoin('player', 'player.id', 'teamAccept.player')
  .where('teamAccept.id', id)
  .first()
}

  const create = async (
    team,
    player,
    active
  ) => {
    await knex('teamAccept').insert({
      team,
      player,
      active
    })
  }

  const update = async (
    id,
    team,
    player,
    active
  ) => {
    knex.transaction(async trx => {
      await knex('teamAccept').transacting(trx).where('id', id).update({
        active
      })
      await knex('teamPlayers').transacting(trx).insert({
        team,
        player,
      })
    })
  }

  const remove = (id, active) => {
    return knex('teamAccept').where('id', id).update({
      active
    })
  }

  export {
    getAll,
    get,
    create,
    update,
    remove
  }