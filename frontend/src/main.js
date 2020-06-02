import Vue from 'vue'
import axios from 'axios'

import './registerServiceWorker'
import logger from './logger'
import { getToken, setToken, removeToken, loadModule } from './util'
import money from 'v-money'
import VueTheMask from 'vue-the-mask'
import VueScrollTo from 'vue-scrollto'
import Loading from './Loading/LoadingScreen'
import infiniteScroll from 'vue-infinite-scroll'
import Card from './admin/component/Card'
import Random from './admin/component/RandomTeam'
// import Chart from 'chart.js'
// Importando Icones Globalmente
import IconAdd from './Icons/IconAdd'
import IconCreditCard from './Icons/IconCreditCard'
import IconAngle from './Icons/IconAngle'
import IconClient from './Icons/IconClient'
import IconClose from './Icons/IconClose'
import IconDashboard from './Icons/IconDashboard'
import IconEdit from './Icons/IconEdit'
import IconField from './Icons/IconField'
import IconHability from './Icons/IconHability'
import IconInfo from './Icons/IconInfo'
import IconLog from './Icons/IconLog'
import IconOut from './Icons/IconOut'
import IconRandom from './Icons/IconRandom'
import IconRent from './Icons/IconRent'
import IconRented from './Icons/IconRented'
import IconSearch from './Icons/IconSearch'
import IconSpinner from './Icons/IconSpinner'
import IconTeam from './Icons/IconTeam'
import IconView from './Icons/IconView'
import IconWarning from './Icons/IconWarning'


import './_asset/scss/app.scss'

Vue.config.productionTip = false

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
// Vue.use(Chart)
Vue.use(infiniteScroll)
Vue.component('Loading', Loading)
Vue.component('Card', Card)
Vue.component('Random', Random)
Vue.use(money, {
  precision: 2,
  prefix: 'R$ '
})
Vue.use(VueTheMask)
// Error handler

// Icon Global
Vue.component('IconAdd', IconAdd)
Vue.component('IconAngle', IconAngle)
Vue.component('IconClient', IconClient)
Vue.component('IconClose', IconClose)
Vue.component('IconDashboard', IconDashboard)
Vue.component('IconEdit', IconEdit)
Vue.component('IconField', IconField)
Vue.component('IconHability', IconHability)
Vue.component('IconInfo', IconInfo)
Vue.component('IconLog', IconLog)
Vue.component('IconOut', IconOut)
Vue.component('IconRandom', IconRandom)
Vue.component('IconRent', IconRent)
Vue.component('IconRented', IconRented)
Vue.component('IconSearch', IconSearch)
Vue.component('IconSpinner', IconSpinner)
Vue.component('IconTeam', IconTeam)
Vue.component('IconView', IconView)
Vue.component('IconWarning', IconWarning)
Vue.component('IconCreditCard', IconCreditCard)

//
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
      } else if ( data.user.role === 'client') {
        // Start client module
        loadModule('client', data.user)
      } else if ( data.user.role === 'player') {
        // Start player module
        loadModule('player', data.user)
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
