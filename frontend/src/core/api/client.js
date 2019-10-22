import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async () => {
  return axios.get(`${API}/client`)
}

const get = async (id) => {
  return axios.get(`${API}/client/${id}`)
}

const create = async (
  name,
  phone,
  city,
  state,
  postal,
  street,
  number
) => {
  return axios.post(`${API}/client`, { 
    name,
    phone,
    city,
    state,
    postal,
    street,
    number
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
  return axios.put(`${API}/client/${id}`, {
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
