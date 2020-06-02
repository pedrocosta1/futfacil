import Vue from 'vue'
import Router from 'vue-router'

import Main from './component/Main.vue'
import FrontPage from './component/FrontPage'
import SignIn from './component/SignIn.vue'
import SignOn from './component/SignOn.vue'

Vue.use(Router)

const router = new Router({
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
      component: SignIn
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signon',
      name: 'signon',
      component: SignOn,
      props: (route) => ({ login: route.query.login })
    }
  ]
})

export default router
