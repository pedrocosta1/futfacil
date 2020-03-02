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

export {
  getAll,
  get,
  getFields
}
