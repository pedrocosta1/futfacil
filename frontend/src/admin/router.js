import Vue from 'vue'
import Router from 'vue-router'

import Main from './component/Main.vue'
import Clients from './component/Clients.vue'
import Client from './component/Client.vue'
import Players from './component/Players.vue'
import Player from './component/Player.vue'
import Fields from './component/Fields.vue'
import Field from './component/Field.vue'
import RentField from './component/RentField.vue'
import RentFields from './component/RentFields.vue'
import Rented from './component/Rented.vue'
import Renteds from './component/Renteds.vue'
import RentedFields from './component/RentedFields.vue'
import RentedField from './component/RentedField.vue'
import RandomTeam from './component/RandomTeam.vue'

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
    },
    {
      path: '/clients/:client/fields',
      name: 'fields',
      component: Fields,
      props: true
    },
    {
      path: '/clients/:client/fields/:id',
      name: 'field',
      component: Field,
      props: true
    },
    {
      path: '/clients/:client/rentedfields',
      name: 'rentedFields',
      component: RentedFields,
      props: true
    },
    {
      path: '/clients/:client/rentedfields/:id',
      name: 'rentedField',
      component: RentedField,
      props: true
    },
    {
      path: '/players',
      name: 'players',
      component: Players
    },
    {
      path: '/players/:id',
      name: 'player',
      component: Player,
      props: true
    },
    {
      path: '/players/:id/rent',
      name: 'RentFields',
      component: RentFields,
      props: true
    },
    {
      path: '/players/:id/rent/:fieldId',
      name: 'RentField',
      component: RentField,
      props: true
    },
    {
      path: '/players/:id/rented',
      name: 'Renteds',
      component: Renteds,
      props: true
    },
    {
      path: '/players/:id/rented/:rentId',
      name: 'Rented',
      component: Rented,
      props: true
    },
    {
      path: '/random',
      name: 'RandomTeam',
      component: RandomTeam
    }
  ]
})
