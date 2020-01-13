<template>
<div class="fut-background" v-if="!loading">
<Loading v-if="loading"/>
  <div class="fut-player-card">
    <div class="player-card-top">
      <div class="player-master-info">
        <div class="player-rating">
          <span>{{overall}}</span>
        </div>
        <div class="player-nation">
          <img :src="nationality" alt="Argentina" draggable="false">
        </div>
        <div class="player-club">
          <img :src="club" alt="Barcelona" draggable="false">
        </div>
      </div>
      <div class="player-picture">
        <img :src="picture ? picture : picture1" alt="Messi" draggable="false">
      </div>
    </div>
    <div class="player-card-bottom">
        <div class="player-info">
            <div class="player-name">
              <span>{{habilities.name}}</span>
            </div>
            <div class="player-features">
                <div class="player-features-col">
                  <span class="player-feature-value">{{column1[0].value}}</span>
                  <span class="player-feature-title">{{column1[0].name}}</span>
                  <span class="player-feature-value">{{column1[1].value}}</span>
                  <span class="player-feature-title">{{column1[1].name}}</span>
                  <span class="player-feature-value">{{column1[2].value}}</span>
                  <span class="player-feature-title">{{column1[2].name}}</span>
                </div>
                <div class="player-features-col">
                  <span class="player-feature-value">{{column2[0].value}}</span>
                  <span class="player-feature-title">{{column2[0].name}}</span>
                  <span class="player-feature-value">{{column2[1].value}}</span>
                  <span class="player-feature-title">{{column2[1].name}}</span>
                  <span class="player-feature-value">{{column2[2].value}}</span>
                  <span class="player-feature-title">{{column2[2].name}}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import Loading from '../../Loading/LoadingScreen.vue'
import { get } from '../api/hability'

export default {
  components: {
    Loading
  },
  props: ['id'],
  data () {
    // Utilizar a sigla que vem do banco para mudar na variavel Nationality //
    return {
      habilities: [],
      column1: [],
      column2: [],
      loading: false,
      club1: 'https://media.api-football.com/teams/33.png',
      picture1: 'https://selimdoyranli.com/cdn/fut-player-card/img/messi.png',
      picture: null,
      overall: null,
      nationality: null,
      club: null,
      validation: true
    }
  },
  async mounted () {
    this.loading = true
    this.habilities = await get(this.id)
    this.overall = this.habilities.overall
    if(this.habilities.photo){
      this.picture = 'img/profiles/' + this.habilities.photo
    }
    this.club = `https://media.api-football.com/teams/${this.habilities.club}.png`
    this.nationality = `https://www.countryflags.io/${this.habilities.nacionality}/flat/64.png`
    await this.mountColumns(this.habilities)
    if (!this.validation) {
      this.loading = false
    }
  },
  methods: {
    async mountColumns (habilities) {
      this.column1[0] = { 'name': 'PAC', 'value': habilities.pac }
      this.column1[1] = { 'name': 'SHO', 'value': habilities.shot }
      this.column1[2] = { 'name': 'PAS', 'value': habilities.pas }
      this.column2[0] = { 'name': 'DRI', 'value': habilities.dri }
      this.column2[1] = { 'name': 'DEF', 'value': habilities.def }
      this.column2[2] = { 'name': 'PHY', 'value': habilities.phy }
      this.validation = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .fut-background {
    width: 100%;
    height: 100%;
  }
</style>
