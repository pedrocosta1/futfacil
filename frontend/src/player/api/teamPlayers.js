import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async (team) => {
  const { data } = await axios.get(`${API}/teamPlayers/all/${team}`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/teamPlayers/${id}`)
  return data
}


const remove = async (
  id,
  active
) => {
  return axios.put(`${API}/teamPlayers/${id}`, {
    active,
  })
}

export {
  getAll,
  get,
  remove
}
