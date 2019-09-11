import axios from 'axios'

const API = process.env.VUE_APP_API

export const exist = async (login) => {
  return axios.post(`${API}/auth/exist`, { login })
}

export const signin = async (login, password) => {
  return axios.post(`${API}/auth/signin`, { login, password })
}

export const signon = async (login, password) => {
  return axios.post(`${API}/auth/signon`, { login, password })
}
