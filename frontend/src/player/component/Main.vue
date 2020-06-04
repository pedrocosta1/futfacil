<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Dashboard
        </div>
      </div>
      <div class="panel">
        <div class="panel-player">
          <div class="player-data">
            <div class="title">Jogos</div>
            <div class="data">{{games.numberGames}}</div>
          </div>
          <hr>
          <div class="player-data">
            <div class="title">Capitão</div>
            <div class="data">{{captainTeam.captain}}</div>
          </div>
          <hr>
          <div class="player-data">
            <div class="title">Times</div>
            <div class="data">{{team.team}}</div>
          </div>
        </div>
        <div class="panel-client">
          <div class="client-data" v-for="rank in ranking" :key="rank.id">
            <div class="number">{{rank.ranking}}</div>
            <div class="photo">
              <img src="../../_asset/image/futeba.png">
            </div>
            <div class="stats">
              <div class="data">
                <div class="title-data">Nome: </div>
                <div class="body-data"> {{rank.name}}</div>
              </div>
              <div class="data">
                <div class="title-data">Campos Alugados: </div>
                <div class="body-data"> {{rank.rentedFields}}</div>
              </div>
              <div class="data">
                <div class="title-data">Numero de campos: </div>
                <div class="body-data"> {{rank.numberField}}</div>
              </div>
            </div>
          </div>
          <hr>
        </div>
        <div class="panel-client">
          <div class="client-data" v-for="team in teamRank" :key="team.id">
            <div class="number">{{team.rank}}</div>
            <div class="photo">
              <img src="../../_asset/image/barce.png" style="border-radius: 25%">
            </div>
            <div class="stats">
              <div class="data">
                <div class="body-data">{{team.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { getGames, getCaptain, getTeams, getFields, getRanking, getOverall, getTeam, getRankTeams } from '../api/dashboard'

export default {
  computed: {
    ...mapState(['user']),
    ...mapState(['player'])
  },
  data () {
    return {
      id: null,
      loading: true,
      playerData: null,
      games: [],
      captainTeam: [],
      team: [],
      teamRank: [],
      ranking: [],
      overall: [],
      field: []
    }
  },
  async mounted () {
    if(this.user && this.player) {
      this.id = this.player.id
    } 
    // First Panel
    this.games = await getGames(this.id)
    this.captainTeam = await getCaptain(this.id)
    this.team = await getTeam(this.id)

    // Second Panel
    const object = await getRanking()
    this.ranking = object[0]
    this.field = object[1]
    this.ranking = this.ranking.map((x, ind ) => {
      x.ranking = ind + 1
      let z = this.field.filter(y => y.id === x.id)
      if(z) x.numberField = z[0].numberField
      return x
    })

    // third Panel
    this.teamRank = await getRankTeams()
    this.teamRank.map((x, ind) => x.rank = ind + 1)
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .panel {
    margin-top: 35px;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    .panel-player {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: space-between;
      .player-data {
        display: flex;
        background: #252439;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 20px;
        .title {
          text-align: center;
          font-size: 14px;
        }
        .data {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
          font-size: 32px;
        }
      }
    }
    .panel-client {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      .client-data {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background: #252439;
        max-height: 242px;
        border: 1px solid #c1c1c1;
        .number {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 36px;
          padding: 20px;
          border-right: 1px solid #c1c1c1;
        }
        .photo {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
          }
        }
        .stats {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 10px;
          .data {
            display: flex;
            flex-direction: row;
            font-size: 16px;
            padding-bottom: 15px;
            .body-data {
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
