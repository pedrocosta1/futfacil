import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async (player) => {
  const { data } = await axios.get(`${API}/creditCard/${player}`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/creditCard/player/${id}`)
  return data
}

const create = async (
  flag,
  numberCard,
  validation,
  ccv,
  name,
  checked,
  player
) => {
  return await axios.post(`${API}/creditCard`, {
    flag,
    numberCard,
    validation,
    ccv,
    name,
    checked,
    player
  })
}

const update = async (
  id,
  flag,
  numberCard,
  validation,
  ccv,
  name,
  checked
) => {
  return await axios.put(`${API}/creditCard/${id}`, {
    flag,
    numberCard,
    validation,
    ccv,
    name,
    checked
  })
}

const remove = async (
  id
) => {
  return await axios.delete(`${API}/creditCard/${id}`)
}



export {
  getAll,
  get,
  create,
  update,
  remove
}
