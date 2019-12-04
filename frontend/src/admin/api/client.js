import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async () => {
  const { data } = await axios.get(`${API}/client`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/client/${id}`)
  return data
}

const create = async (
  name,
  phone,
  city,
  state,
  postal,
  street,
  number,
  neighborhood,
  description
) => {
  return axios.post(`${API}/client`, {
    name,
    phone,
    city,
    state,
    postal,
    street,
    number,
    neighborhood,
    description
  })
}

const update = async (
  id,
  name,
  phone,
  city,
  state,
  postal,
  street,
  number,
  neighborhood
) => {
  return axios.put(`${API}/client/${id}`, {
    name,
    phone,
    city,
    state,
    postal,
    street,
    number,
    neighborhood
  })
}

export {
  getAll,
  get,
  create,
  update
}
