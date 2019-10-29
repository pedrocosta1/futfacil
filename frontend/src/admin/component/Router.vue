<template>
  <div id="app">
    <div class="menu-container">
      <div class="menu" :class="open ? 'menu-open' : ''" @click="openClose(open)">
        <div class="menu-item" @click="changeRoute('dashboard')" :class="dashboard ? 'active' : ''">
          <div class="menu-open-svg">
            <IconDashboard class="menu-svg" />
          </div>
          <span class="menu-text">Dashboard</span>
        </div>
        <div class="menu-item" @click="changeRoute('clients')" :class="clients ? 'active' : ''">
          <div class="menu-open-svg">
            <IconClient class="menu-svg" />
          </div>
          <span class="menu-text">Clientes</span>
        </div>
        <div class="menu-item" @click="changeRoute('fields')" :class="fields ? 'active' : ''">
          <div class="menu-open-svg">
            <IconField class="menu-svg" />
          </div>
          <span class="menu-text">Fields</span>
        </div>
        <div class="menu-out" @click="signOut">
          <div class="menu-open-svg">
            <IconOut class="menu-svg" />
          </div>
          <span class="menu-text">Sair</span>
        </div>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { removeToken, loadModule } from '../../util'
import IconClient from '../../Icons/IconClient'
import IconDashboard from '../../Icons/IconDashboard'
import IconOut from '../../Icons/IconOut'
import IconField from '../../Icons/IconField'

export default {
  components: {
    IconClient,
    IconDashboard,
    IconOut,
    IconField
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      path: null,
      clients: false,
      fields: false,
      dashboard: false,
      open: true
    }
  },
  methods: {
    signOut () {
      this.$store.commit('user', null)
      this.$root.$destroy()
      removeToken()
      loadModule('core')
    },
    changeRoute (route) {
      this.$router.push('/' + route)
      this.path = this.$route.path.split('/')[1]
      if (this.path === 'clients') this.clients = true
      else if (this.path === 'fields') this.fields = true
    },
    openClose (open) {
      this.open = !open
    }
  }
}
</script>
