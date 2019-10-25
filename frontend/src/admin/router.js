import Vue from 'vue'
import Router from 'vue-router'

import Main from './component/Main.vue'
import Clients from './component/Clients.vue'
import Client from './component/Client.vue'

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
      path: '/clients',
      name: 'clients',
      component: Clients
    },
    {
      path: '/clients/:id',
      name: 'client',
      component: Client,
      props: true
    }
  ]
})
