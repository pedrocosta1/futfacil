import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async (id) => {
  const { data } = await axios.get(`${API}/team`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/team/${id}`)
  return data
}

const create = async (
  name,
  player,
  logo,
) => {
  return axios.post(`${API}/team`, {
    name,
    player,
    logo,
  })
}

const update = async (
  id,
  name,
  player,
  logo,
) => {
  return axios.put(`${API}/team/${id}`, {
    name,
    player,
    logo,
  })
}

export {
  getAll,
  get,
  create,
  update
}
