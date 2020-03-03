import axios from 'axios'

const API = process.env.VUE_APP_API

const get = async (id) => {
  const { data } = await axios.get(`${API}/client/client/client/${id}`)
  return data
}

const getUser = async (user) => {
  const { data } = await axios.get(`${API}/client/client/${user}`)
  return data
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
  return axios.put(`${API}/client/client/${id}`, {
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
  get,
  getUser,
  update
}
