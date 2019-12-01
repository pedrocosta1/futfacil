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

const getRentedList = async (id) => {
  const { data } = await axios.get(`${API}/fieldList/client/${id}`)
  return data
}

const getRentedDetails = async (id) => {
  const { data } = await axios.get(`${API}/fieldList/details/${id}`)
  return data
}

const create = async (
  field,
  hourIni,
  hourEnd,
  day
) => {
  return axios.post(`${API}/fieldList`, {
    field,
    hourIni,
    hourEnd,
    day
  })
}

const update = async (
  id,
  field,
  date,
  hourIni,
  hourEnd,
  day,
  active
) => {
  return axios.put(`${API}/fieldList/${id}`, {
    field,
    date,
    hourIni,
    hourEnd,
    day,
    active
  })
}

export {
  getAll,
  get,
  getRentedList,
  getRentedDetails,
  create,
  update
}
