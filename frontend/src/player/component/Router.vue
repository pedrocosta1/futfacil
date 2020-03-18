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
          <span class="menu-text">Jogador</span>
        </div>
        <div class="menu-item" @click="changeRoute('team')" :class="teams ? 'active' : ''">
          <div class="menu-open-svg">
            <IconTeam class="menu-svg" />
          </div>
          <span class="menu-text">Times</span>
        </div>
        <div class="menu-item" @click="changeRoute('rent')" :class="rent ? 'active' : ''">
          <div class="menu-open-svg">
            <IconRent class="menu-svg" />
          </div>
          <span class="menu-text">Alugar Campos</span>
        </div>
        <div class="menu-item" @click="changeRoute('rented')" :class="rented ? 'active' : ''">
          <div class="menu-open-svg">
            <IconRented class="menu-svg" />
          </div>
          <span class="menu-text">Campos Alugados</span>
        </div>
        <div class="menu-item" @click="changeRoute('hability')" :class="hability ? 'active' : ''">
          <div class="menu-open-svg">
            <IconHability class="menu-svg" />
          </div>
          <span class="menu-text">Card</span>
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
import { removeToken, loadModule } from '../../util'

export default {
  computed: {
    ...mapState(['user']),
    ...mapState(['player']),
  },
  data () {
    return {
      path: null,
      players: false,
      rented: false,
      hability: false,
      rent: false,
      dashboard: false,
      open: true,
      random: false,
      teams: false,
      log: false,
    }
  },
  methods: {
    signOut () {
      this.$store.commit('user', null)
      this.$store.commit('player', null)
      this.$root.$destroy()
      removeToken()
      loadModule('core')
    },
    changeRoute (route) {
      this.players = false
      this.random = false
      this.hability = false
      this.rented = false
      this.rent = false
      this.teams = false
      this.$router.push('/' + route)
      this.path = this.$route.path.split('/')[1]
      if (this.path === 'player') this.players = true
      else if (this.path === 'rented') this.rented = true
      else if (this.path === 'rent') this.rent = true
      else if (this.path === 'hability') this.hability = true
      else if (this.path === 'random') this.random = true
      else if (this.path === 'team') this.teams = true
    },
    openClose (open) {
      if(window.innerWidth > 768) this.open = true
      else this.open = !open
    }
  }
}
</script>
