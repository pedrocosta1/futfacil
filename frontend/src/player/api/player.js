import axios from 'axios'

const API = process.env.VUE_APP_API

const get = async (id) => {
  const { data } = await axios.get(`${API}/player/player/${id}`)
  return data
}

const getData = async (id) => {
  const { data } = await axios.get(`${API}/player/player/data/${id}`)
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
  return axios.put(`${API}/player/player/${id}`, {
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
  getData,
  update
}
