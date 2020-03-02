import Vue from 'vue'
import Router from 'vue-router'

import Main from './component/Main.vue'
import Player from './component/Player.vue'
import Hability from './component/Hability.vue'
import RentField from './component/RentField.vue'
import RentFields from './component/RentFields.vue'
import RentedFields from './component/RentedFields.vue'


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
    },
    {
      path: '/hability',
      name: 'hability',
      component: Hability
    },
    {
      path: '/rent',
      name: 'rents',
      component: RentFields
    },
    {
      path: '/rent/:fieldId',
      name: 'rent',
      component: RentField,
      props: true
    },
    {
      path: '/rented',
      name: 'rented',
      component: RentedFields
    },
  ]
})
