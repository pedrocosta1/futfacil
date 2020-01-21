import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async () => {
  const { data } = await axios.get(`${API}/log`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/log/${id}`)
  return data
}

export {
  getAll,
  get
}
