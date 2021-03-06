import Vue from 'vue'
import axios from 'axios'

import router from './router'
import store from './store'
import Router from './component/Router.vue'
import { removeToken, loadModule } from '../util'
import { getUser } from './api/client'

export const render = async (user) => {
  const client = await getUser(user.id)
  new Vue({
    router,
    store,
    render: h => h(Router),
    beforeCreate () {
      this.$store.commit('user', user)
      this.$store.commit('client', client)
    }
  }).$mount('#app')
}

// Default interceptor for Unauthorized 401
axios.interceptors.response.use(undefined, error => {
  if (error.response.status === 401) {
    removeToken()
    loadModule('core')
    return null
  }
  return Promise.reject(error)
})
