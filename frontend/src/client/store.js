import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    client: null
  },
  mutations: {
    user (state, value) { state.user = value },
    client (state, value) { state.client = value }
  },
  actions: {

  }
})
