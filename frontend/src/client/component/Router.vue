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
        <div class="menu-item" @click="changeRoute('client')" :class="clients ? 'active' : ''">
          <div class="menu-open-svg">
            <IconClient class="menu-svg" />
          </div>
          <span class="menu-text">Clientes</span>
        </div>
        <div class="menu-item" @click="changeRoute('fields')" :class="fields ? 'active' : ''">
          <div class="menu-open-svg">
            <IconField class="menu-svg" />
          </div>
          <span class="menu-text">Cadastro Campos</span>
        </div>
        <div class="menu-item" @click="changeRoute('renteds')" :class="renteds ? 'active' : ''">
          <div class="menu-open-svg">
            <IconRandom class="menu-svg" />
          </div>
          <span class="menu-text">Campos Alugados</span>
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

export default {
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      path: null,
      clients: false,
      renteds: false,
      fields: false,
      dashboard: false,
      open: true,
      random: false,
      log: false,
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
      this.clients = false
      this.renteds = false
      this.fields = false
      this.$router.push('/' + route)
      this.path = this.$route.path.split('/')[1]
      if (this.path === 'client') this.clients = true
      else if (this.path === 'fields') this.fields = true
      else if (this.path === 'renteds') this.renteds = true
      else if (this.path === 'logs') this.log = true
    },
    openClose (open) {
      if(window.innerWidth > 768) this.open = true
      else this.open = !open
    }
  }
}
</script>
