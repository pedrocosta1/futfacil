import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './component/Main.vue'
import Client from './component/Client.vue'
import Fields from './component/Fields.vue'
import Field from './component/Field.vue'
import RentedField from './component/RentedField.vue'
import RentedFields from './component/RentedFields.vue'

Vue.use(Router)

export default new Router({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/client',
      name: 'client',
      component: Client
    },
    {
      path: '/fields',
      name: 'fields',
      component: Fields
    },
    {
      path: '/fields/:id',
      name: 'field',
      component: Field,
      props: true
    },
    {
      path: '/renteds',
      name: 'renteds',
      component: RentedFields
    },
    {
      path: '/renteds/:id',
      name: 'rented',
      component: RentedField,
      props: true
    }
  ]
})
