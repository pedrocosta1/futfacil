import knex from '../config/knex'

const getGames = async (player) => {
  return await knex('rent')
  .count('id as numberGames')
  .where('player', player)
  .first()
}

const getTeamCaptain = async (player) => {
  return await knex('team')
  .count('id as captain')
  .where('player', player)
  .first()
}

const getTeam = async (player) => {
  return await knex('teamPlayers')
  .count('id as team')
  .where('player', player)
  .andWhere('active', true)
  .first()
}

const getClientRanking = async () => {
  return await knex('rent')
  .count('client.id as rentedFields')
  .select('client.id', 'client.name')
  .leftJoin('field', 'field.id', 'rent.field')
  .leftJoin('client', 'client.id', 'field.client')
  .groupBy('client.id')
}

const getFields = async () => {
  return await knex('field')
  .select('client.id')
  .count('field.client as numberField')
  .leftJoin('client', 'client.id', 'field.client')
  .groupBy('client.id')
}

const getTeamOverall = async () => {
  return await knex('teamPlayers')
  .select('teamPlayers.team','playerHability.overall')
  .leftJoin('playerHability', 'playerHability.player', 'teamPlayers.player')
}

const getRankTeams = async () => {
  return await knex('team')
}


  export {
    getGames,
    getTeamCaptain,
    getTeam,
    getClientRanking,
    getFields,
    getTeamOverall,
    getRankTeams
  }