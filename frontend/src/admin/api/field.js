import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async (client) => {
  const { data } = await axios.get(`${API}/field/by/${client}`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/field/${id}`)
  return data
}

const getFields = async () => {
  const { data } = await axios.get(`${API}/field`)
  return data
}

const create = async (
  name,
  client,
  type,
  size,
  maxPerson,
  price,
  hourPrice
) => {
  return axios.post(`${API}/field`, {
    name,
    client,
    type,
    size,
    maxPerson,
    price,
    hourPrice
  })
}

const update = async (
  id,
  name,
  client,
  type,
  size,
  maxPerson,
  price,
  hourPrice
) => {
  return axios.put(`${API}/field/${id}`, {
    name,
    client,
    type,
    size,
    maxPerson,
    price,
    hourPrice
  })
}

export {
  getAll,
  get,
  getFields,
  create,
  update
}
