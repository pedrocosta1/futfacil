import Vue from 'vue'

import router from './router'
import store from './store'
import Router from './component/Router.vue'

export const render = () => {
  new Vue({
    router,
    store,
    render: h => h(Router)
  }).$mount('#app')
}
