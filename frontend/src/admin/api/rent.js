import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async (field) => {
  const { data } = await axios.get(`${API}/rent/by/${field}`)
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
  dataIni,
  dataFinal,
  hour
) => {
  return axios.post(`${API}/rent`, {
    player,
    field,
    price,
    dataIni,
    dataFinal,
    hour
  })
}

const update = async (
  id,
  player,
  field,
  price,
  dataIni,
  dataFinal,
  hour
) => {
  return axios.put(`${API}/rent/${id}`, {
    player,
    field,
    price,
    dataIni,
    dataFinal,
    hour
  })
}

export {
  getAll,
  get,
  create,
  update
}
