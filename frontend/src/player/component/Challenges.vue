<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Desafiar Times
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
            <th>Time</th>
            <th>Capitão do Time</th>
          </thead>
          <tr v-for="challenge in challengesFiltered" :key="challenge.id" @click="$router.push(`/team/${id}/challenge/${challenge.id}`)">
            <td>{{challenge.name}}</td>
            <td>{{challenge.playerName}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { getTeamChallenge } from '../api/team'
import { mapState } from 'vuex'

export default {
  props: ['id'],
  data () {
    return {
      challenges: [],
      search: '',
      loading: true
    }
  },
  computed: {
    challengesFiltered () {
      return this.challenges.filter((challenge) => {
        return String(challenge.name).toUpperCase().includes(this.search.toUpperCase()) ||
        String(challenge.playerName).toUpperCase().includes(this.search.toUpperCase())
      })
    },
    ...mapState(['player']),
  },
  async mounted () {
    this.challenges = await getTeamChallenge(this.player.id)
    this.loading = false
  }
}
</script>
