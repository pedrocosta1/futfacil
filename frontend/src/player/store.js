import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    player: null
  },
  mutations: {
    user (state, value) { state.user = value },
    player (state, value) { state.player = value }
  },
  actions: {

  }
})
