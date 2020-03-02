import axios from 'axios'

const API = process.env.VUE_APP_API

const getAll = async (field, active) => {
  const { data } = await axios.get(`${API}/fieldList/${field}/${active}`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/fieldList/${id}`)
  return data
}

const getRentedListPlayer = async (player) => {
  const { data } = await axios.get(`${API}/fieldList/player/${player}`)
  return data
}

const getRentedDetails = async (id) => {
  const { data } = await axios.get(`${API}/fieldList/details/${id}`)
  return data
}


export {
  getAll,
  get,
  getRentedDetails,
  getRentedListPlayer
}
