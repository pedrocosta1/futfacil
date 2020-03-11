import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async (team) => {
  const { data } = await axios.get(`${API}/challenge/player/all/${team}`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/challenge/player/${id}`)
  return data
}

const create = async (
  team1,
  team2,
  date,
  field,
  victory,
  happend
) => {
  return axios.post(`${API}/challenge/player`, {
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
  return axios.put(`${API}/challenge/player/victory/${id}`, {
    team
  })
}

const updateAccept = async (
  id,
  accept
) => {
  return axios.put(`${API}/challenge/player/accept/${id}`, {
    accept
  })
}

export {
  getAll,
  get,
  create,
  updateChallenge,
  updateAccept
}
