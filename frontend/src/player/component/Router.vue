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
          <span class="menu-text">Habilidade</span>
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
import IconClient from '../../Icons/IconClient'
import IconDashboard from '../../Icons/IconDashboard'
import IconOut from '../../Icons/IconOut'
import IconField from '../../Icons/IconField'
import IconRandom from '../../Icons/IconRandom'
import IconLog from '../../Icons/IconLog'
import IconRent from '../../Icons/IconRent'
import IconRented from '../../Icons/IconRented'
import IconHability from '../../Icons/IconHability'

export default {
  components: {
    IconClient,
    IconDashboard,
    IconOut,
    IconField,
    IconRandom,
    IconLog,
    IconRent,
    IconRented,
    IconHability
  },
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
      this.$router.push('/' + route)
      this.path = this.$route.path.split('/')[1]
      console.log(this.path)
      if (this.path === 'player') this.players = true
      else if (this.path === 'rented') this.rented = true
      else if (this.path === 'rent') this.rent = true
      else if (this.path === 'hability') this.hability = true
      else if (this.path === 'random') this.random = true
    },
    openClose (open) {
      this.open = !open
    }
  }
}
</script>
