<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Desafios
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
            <th class="td-hidden">Data da Criação</th>
            <th>Status</th>
          </thead>
          <tr v-for="challenge in challengesFiltered" :key="challenge.id" @click="$router.push(`/team/${id}/challenge/${challenge.id}`)">
            <td>{{challenge.teamName}}</td>
            <td>{{challenge.playerName}}</td>
            <td class="td-hidden">{{challenge.date}}</td> 
            <td>{{challenge.accept ? 'Aceito' : 'Pendente'}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { getAll } from '../api/challenge'
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
  },
  async mounted () {
    this.challenges = await getAll(this.id)
    this.challenges.map(x => {
      x.date = x.date.split('T')[0]
      const datasplit = x.date.split('-')
      x.date = datasplit[2] + '-' + datasplit[1] + '-' + datasplit[0]
      return x
    })
    this.loading = false
  }
}
</script>
