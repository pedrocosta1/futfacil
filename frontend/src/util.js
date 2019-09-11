import axios from 'axios'

const SESSION_NAME = 'templateSession'

const getToken = () => JSON.parse(localStorage.getItem(SESSION_NAME))

const setToken = (token) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`
  localStorage.setItem(SESSION_NAME, JSON.stringify(token))
}

const removeToken = () => {
  delete axios.defaults.headers.Authorization
  localStorage.removeItem(SESSION_NAME)
}

const loadModule = (module, user = null) => {
  import(/* webpackChunkName: "[request]" */ `./${module}/main`).then(x => x.render(user))
}

export {
  getToken,
  setToken,
  removeToken,
  loadModule
}
