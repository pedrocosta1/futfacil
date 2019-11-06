<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          player
        </div>
        <div class="close" @click="$router.push('/')">
          <IconClose/>
        </div>
      </div>
      <div class="header-search">
        <div class="search">
            <input type="text" v-model="search">
            <IconSearch class="svg-search"/>
        </div>
        <div class="btn-svg" @click="$router.push('/players/new')">
          <IconAdd class="svg-add"/>
        </div>
      </div>
      <div class="table">
        <table>
          <tr v-for="player in filteredPlayers" :key="player.id" @click="$router.push(`/players/${player.id}`)">
            <td>{{player.name}}</td>
            <td class="td-hidden">{{player.phone}}</td>
            <td>{{player.city}}</td>
            <td>{{player.state}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { removeToken, loadModule } from '../../util'
import IconClose from '../../Icons/IconClose.vue'
import IconAdd from '../../Icons/IconAdd.vue'
import IconSearch from '../../Icons/IconSearch.vue'
import { getAll } from '../api/player'
import Loading from '../../Loading/LoadingScreen'

export default {
  components: {
    IconClose,
    IconAdd,
    IconSearch,
    Loading
  },
  data () {
    return {
      players: [],
      search: '',
      loading: true
    }
  },
  computed: {
    filteredPlayers () {
      return this.players.filter((player) => {
        return String(player.name).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(player.id).includes(this.search) ||
        String(player.phone).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(player.state).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(player.city).toUpperCase().startsWith(this.search.toUpperCase())
      })
    }
  },
  async mounted () {
    this.players = await getAll()
    this.loading = false
  },
  methods: {
    signOut () {
      this.$store.commit('user', null)
      this.$root.$destroy()
      removeToken()
      loadModule('core')
    }
  }
}
</script>
