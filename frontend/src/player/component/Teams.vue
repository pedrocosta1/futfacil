<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Times Disponiveis
        </div>
      </div>
      <div class="header-search">
        <div class="search">
            <input type="text" v-model="search">
            <IconSearch class="svg-search"/>
        </div>
        <div class="btn-svg" @click="$router.push('/team/new')">
          <IconAdd class="svg-add"/>
        </div>
      </div>
      <div class="table">
        <table>
          <tr v-for="team in filteredTeams" :key="team.id" @click="$router.push(`/team/${team.id}`)">
            <td>{{team.name}}</td>
            <td>{{team.playerName}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import IconClose from '../../Icons/IconClose.vue'
import IconSearch from '../../Icons/IconSearch.vue'
import IconAdd from '../../Icons/IconAdd.vue'
import { getAll } from '../api/team'

export default {
  components: {
    IconClose,
    IconSearch,
    IconAdd
  },
  data () {
    return {
      teams: [],
      search: '',
      loading: true
    }
  },
  computed: {
    filteredTeams () {
      return this.teams.filter((team) => {
        return String(team.name).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(team.id).includes(this.search) ||
        String(team.playerName).toUpperCase().startsWith(this.search.toUpperCase())
      })
    },
    ...mapState(['player'])
  },
  async mounted () {
    this.teams = await getAll()
    this.loading = false
  }
}
</script>
