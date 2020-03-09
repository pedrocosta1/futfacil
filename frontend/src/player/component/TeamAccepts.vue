<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Lista para Entrar no {{ name }}
        </div>
        <div class="close" @click="$router.push(`/team/${id}`)">
          <IconClose/>
        </div>
      </div>
      <div class="header-search">
        <div class="search">
            <input type="text" v-model="search">
            <IconSearch class="svg-search"/>
        </div>
      </div>
      <div class="table">
        <table>
          <thead>
            <th>Nome do Jogador</th>
            <th>Habilidade do Jogador</th>
          </thead>
          <tr v-for="player in filteredTeams" :key="player.id" @click="$router.push(`/team/${id}/accept/${player.id}`)">
            <td>{{player.name}}</td>
            <td>{{player.overall}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { getAll } from '../api/teamAccept'
import { get } from '../api/team'

export default {
  props: ['id'],
  data () {
    return {
      players: [],
      name,
      search: '',
      loading: true
    }
  },
  computed: {
    filteredTeams () {
      return this.players.filter((player) => {
        return String(player.name).toUpperCase().includes(this.search.toUpperCase()) ||
        String(player.overall).toUpperCase().includes(this.search.toUpperCase())
      })
    },
    ...mapState(['player'])
  },
  async mounted () {
    this.players = await getAll(this.id)
    const team = await get(this.id)
    this.name = team.name
    this.loading = false
  }
}
</script>
