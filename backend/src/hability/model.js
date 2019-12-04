import knex from '../config/knex'

const get = async (player) => {
  return await knex('playerHability')
  .where('player', player)
  .first()
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
    await knex('playerHability').insert({
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
  }

  const update = async (
    id,
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
    await knex('playerHability').where('id', id).update({
      id,
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

  const remove = (id) => {
    return knex('playerHability').del('id', id)
  }

  export {
    get,
    create,
    update,
    remove
  }