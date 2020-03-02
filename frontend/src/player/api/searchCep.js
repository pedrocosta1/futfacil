import axios from 'axios'

const API = process.env.VUE_APP_API

const getCep = async (cep) => {
  const { data } = await axios.get(`${API}/cep/${cep}`)
  return data
}

export {
  getCep
}
