import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async (player) => {
  const { data } = await axios.get(`${API}/rent/by/${player}`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/rent/${id}`)
  return data
}

const create = async (
  player,
  field,
  price,
  date,
  hourIni,
  hourEnd
) => {
  return axios.post(`${API}/rent`, {
    player,
    field,
    price,
    date,
    hourIni,
    hourEnd
  })
}

const update = async (
  id,
  player,
  field,
  price,
  date,
  hourIni,
  hourEnd
) => {
  return axios.put(`${API}/rent/${id}`, {
    player,
    field,
    price,
    date,
    hourIni,
    hourEnd
  })
}

export {
  getAll,
  get,
  create,
  update
}
