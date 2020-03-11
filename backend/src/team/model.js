import knex from "../config/knex"

const getAll = async () => {
  return knex('team')
    .select('team.*', 'player.name as playerName')
    .leftJoin('player', 'player.id', 'team.player')
    .andWhere('team.active', true)
}

const getAllTeamChallenge = async (player) => {
  return knex('team')
    .select('team.*', 'player.name as playerName')
    .leftJoin('player', 'player.id', 'team.player')
    .where('team.active', true)
    .whereNot('team.player', player)
}

const get = async (id) => {
  return await knex('team')
  .where('team.id', id)
  .andWhere('team.active', true)
  .first()
}

  const create = async (
    name,
    player,
    logo
  ) => {
    await knex('team').insert({
      name,
      player,
      logo
    })
  }

  const update = async (
    id,
    name,
    player,
    logo
  ) => {
    await knex('team').where('id', id).update({
      name,
      player,
      logo
    })
  }

  const remove = (id, active) => {
    return knex('team').where('id', id).update({
      active
    })
  }

  export {
    getAll,
    getAllTeamChallenge,
    get,
    create,
    update,
    remove
  }