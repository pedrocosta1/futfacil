import axios from 'axios'

const API = process.env.VUE_APP_API

const get = async (player) => {
  const { data } = await axios.get(`${API}/hability/${player}`)
  return data
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
  return axios.post(`${API}/hability`, {
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
  return axios.put(`${API}/hability/${id}`, {
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

export {
  get,
  create,
  update
}
