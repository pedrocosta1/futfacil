import axios from 'axios'

const API = process.env.VUE_APP_API


const get = async (field) => {
  const { data } = await axios.get(`${API}/fieldImages/player/${field}`)
  return data
}


export {
  get,
}
