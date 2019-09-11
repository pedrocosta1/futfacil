import Vue from 'vue'
import axios from 'axios'

import './registerServiceWorker'
import logger from './logger'
import { getToken, setToken, removeToken, loadModule } from './util'

Vue.config.productionTip = false

// Error handler
Vue.config.errorHandler = (err, vm, info) => {
  logger.error(err)
}

// Warning handler
Vue.config.warnHandler = (msg, vm, trace) => {
  logger.warn(msg)
}

// Inside function because async
const run = async () => {
  try {
    const token = getToken()
    if (token) {
      // Set token on axios header
      setToken(token)
      // Get user from backend
      const { data } = await axios.get(`${process.env.VUE_APP_API}/auth/user`)
      // Renew token
      setToken(data.token)
      if (data.user.role === 'admin') {
        // Start admin module
        loadModule('admin', data.user)
      } else {
        // Start user module
        loadModule('user', data.user)
      }
    } else {
      // Start core module
      loadModule('core')
    }
  } catch (error) {
    logger.error(error)
    removeToken()
    // Start core module
    loadModule('core')
  }
}

run()
