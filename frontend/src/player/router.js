import Vue from 'vue'
import Router from 'vue-router'

import Main from './component/Main.vue'
import Player from './component/Player.vue'

Vue.use(Router)

export default new Router({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/player',
      name: 'player',
      component: Player
    }
  ]
})
