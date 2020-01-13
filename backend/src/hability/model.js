import knex from '../config/knex'

const get = async (player) => {
  return await knex('playerHability')
  .select('playerHability.*', 'countries.name as countryName')
  .leftJoin('countries', 'countries.code', 'playerHability.nacionality')
  .where('player', player)
  .first()
}

const getAll = async () => {
  return await knex('countries')
}

const getTeams = async () => {
  return await knex('leagueTeams')
}

  const create = async (
    player,
    pac,
    shot,
    pas,
    dri,
    def,
    phy,
    photo,
    overall,
    name,
    nacionality,
    club
  ) => {
    const playerH = await knex('playerHability').insert({
      player,
      pac,
      shot,
      pas,
      dri,
      def,
      phy,
      photo,
      overall,
      name,
      nacionality,
      club
    })
    return playerH
  }

  const update = async (
    player,
    pac,
    shot,
    pas,
    dri,
    def,
    phy,
    photo,
    overall,
    name,
    nacionality,
    club
  ) => {
    await knex('playerHability').where('id', player).update({
      pac,
      shot,
      pas,
      dri,
      def,
      phy,
      photo,
      overall,
      name,
      nacionality,
      club
    })
  }

  const updatePhoto = async (
    id,
    photo
  ) => {
    await knex('playerHability').where('id', id).update({
      photo
    })
  }

  const remove = (id) => {
    return knex('playerHability').del('id', id)
  }

  export {
    getAll,
    getTeams,
    get,
    create,
    update,
    updatePhoto,
    remove
  }