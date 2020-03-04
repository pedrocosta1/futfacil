import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async (team) => {
  const { data } = await axios.get(`${API}/teamAccept/all/${team}`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/teamAccept/${id}`)
  return data
}

const create = async (
  team,
  player,
  active,
) => {
  return axios.post(`${API}/teamAccept`, {
    team,
    player,
    active,
  })
}

const update = async (
  id,
  team,
  player,
  active
) => {
  return axios.put(`${API}/teamAccept/${id}`, {
    team,
    player,
    active
  })
}

export {
  getAll,
  get,
  create,
  update
}
