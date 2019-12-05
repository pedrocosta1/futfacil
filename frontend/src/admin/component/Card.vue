<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="fut-player-card">
        <div class="player-card-top">
          <div class="player-master-info">
            <div class="player-rating">
              <span>{{overall}}</span>
            </div>
            <div class="player-position">
              <span>{{position}}</span>
            </div>
            <div class="player-nation">
              <img :src="nationality" alt="Argentina" draggable="false">
            </div>
            <div class="player-club">
              <img :src="club" alt="Barcelona" draggable="false">
            </div>
          </div>
          <div class="player-picture">
            <img :src="picture" alt="Messi" draggable="false">
          </div>
        </div>
        <div class="player-card-bottom">
            <div class="player-info">
                <div class="player-name">
                  <span>MESSI</span>
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
  </section>
</template>

<script>
import Loading from '../../Loading/LoadingScreen.vue'
import { get } from '../api/hability'

export default {
  components: {
    Loading,
  },
  props: ['id'],
  data () {
    // Utilizar a sigla que vem do banco para mudar na variavel Nationality // 
    return {
      habilities: [],
      column1: [],
      column2: [],
      loading: false,
      nationality1: `https://www.countryflags.io/ax/flat/64.png`,
      club1: 'https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg',
      picture1: 'https://selimdoyranli.com/cdn/fut-player-card/img/messi.png',
      overall1: 97,
      picture: null,
      overall: null,
      nationality: null,
      club: null,
      position1: 'MC',
      validation: true
    }
  },
  async mounted () {
    this.loading = true
    this.habilities = await get(this.id)
    this.overall = this.habilities.overall
    this.picture = 'img/profiles/' + this.habilities.photo
    await this.mountColumns(this.habilities)
    if(!this.validation) {
      this.loading = false
    }
  },
  methods: {
    async mountColumns (habilities) {
      this.column1[0] = { 'name' : 'PAC', 'value' : habilities.pac }
      this.column1[1] = { 'name' : 'SHO', 'value' : habilities.shot }
      this.column1[2] = { 'name' : 'PAS', 'value' : habilities.pas }
      this.column2[0] = { 'name' : 'DRI', 'value' : habilities.dri }
      this.column2[1] = { 'name' : 'DEF', 'value' : habilities.def }
      this.column2[2] = { 'name' : 'PHY', 'value' : habilities.phy }
      this.validation = false
    }
  }
}
</script>
