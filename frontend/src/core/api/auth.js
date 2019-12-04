import axios from 'axios'

const API = process.env.VUE_APP_API

const exist = async (login) => {
  return axios.post(`${API}/auth/exist`, { login })
}

const signin = async (login, password) => {
  return axios.post(`${API}/auth/signin`, { login, password })
}

const signon = async (login, password, role) => {
  return axios.post(`${API}/auth/signon`, { login, password, role })
}

export {
  exist,
  signin,
  signon
}
