import axios from 'axios'

const API = process.env.VUE_APP_API

const create = async (
  player,
  field,
  price,
  date,
  hourIni,
  hourEnd,
  day
) => {
  return axios.post(`${API}/rent`, {
    player,
    field,
    price,
    date,
    hourIni,
    hourEnd,
    day
  })
}

const updateRent = async (
  id
) => {
  return axios.put(`${API}/rent/desactive/${id}`)
}

export {
  create,
  updateRent
}
