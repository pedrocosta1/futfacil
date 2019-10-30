import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async () => {
  const { data } = await axios.get(`${API}/player`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/player/${id}`)
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
  description
) => {
  return axios.post(`${API}/player`, {
    name,
    phone,
    city,
    state,
    postal,
    street,
    number,
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
  number
) => {
  return axios.put(`${API}/player/${id}`, {
    name,
    phone,
    city,
    state,
    postal,
    street,
    number
  })
}

export {
  getAll,
  get,
  create,
  update
}
