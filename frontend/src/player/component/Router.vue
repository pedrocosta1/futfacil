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
        <div class="menu-item" @click="changeRoute('player')" :class="players ? 'active' : ''">
          <div class="menu-open-svg">
            <IconField class="menu-svg" />
          </div>
          <span class="menu-text">Jogadores</span>
        </div>
        <div class="menu-item" @click="changeRoute('random')" :class="random ? 'active' : ''">
          <div class="menu-open-svg">
            <IconRandom class="menu-svg" />
          </div>
          <span class="menu-text">Randomizar Times</span>
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
import { get } from '../api/player'
import { removeToken, loadModule } from '../../util'
import IconClient from '../../Icons/IconClient'
import IconDashboard from '../../Icons/IconDashboard'
import IconOut from '../../Icons/IconOut'
import IconField from '../../Icons/IconField'
import IconRandom from '../../Icons/IconRandom'
import IconLog from '../../Icons/IconLog'

export default {
  components: {
    IconClient,
    IconDashboard,
    IconOut,
    IconField,
    IconRandom,
    IconLog
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['player']),
  },
  data () {
    return {
      path: null,
      clients: false,
      players: false,
      fields: false,
      dashboard: false,
      open: true,
      random: false,
      log: false,
    }
  },
  async mounted () {
    const playerData = await get(this.user.id)
    this.$store.commit('player', playerData)
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
      this.players = false
      this.random = false
      this.$router.push('/' + route)
      this.path = this.$route.path.split('/')[1]
      if (this.path === 'clients') this.clients = true
      else if (this.path === 'player') this.players = true
      else if (this.path === 'random') this.random = true
      else if (this.path === 'logs') this.log = true
    },
    openClose (open) {
      this.open = !open
    }
  }
}
</script>
