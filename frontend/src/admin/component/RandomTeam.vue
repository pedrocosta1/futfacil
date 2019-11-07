<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Mistura de Time
        </div>
        <div class="close" @click="$router.push('/')">
          <IconClose/>
        </div>
      </div>
      <div class="content">
        <div class="section first-section">
          <div class="section-header" @click="recallFirst = !recallFirst">
            <span class="title">Jogadores</span>
            <IconAngle :class="recallFirst ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallFirst ? 'recall' : 'recall-body'">
            <div class="form">
              <div class="form-group same-line">
                <label>Nº Jogadores</label>
                <input class="little" v-model="numberPlayer" :disabled="edit" @input="generateNumbersTeams">
                <span v-if="error.indexOf('number') > -1">Ops! Ta faltando o nome</span>
                <label>Jogadores p/ Time</label>
                <input class="little" v-model="playerTeam" :disabled="edit" @input="generateNumbersTeams">
                <label>Quantidade Times</label>
                <input class="little" v-model="qttTeam" disabled>
                <div class="btn" @click="generateInputs">
                  <span>Gerar</span>
                </div>
              </div>
              <div class="form-group same-line" v-for="player in players" :key="player.id">
                <label>Player {{player.id + 1}}</label>
                <label>Nome</label>
                <input v-model="player.name">
                <label>Posição</label>
                <select v-model="player.position">
                  <option value="GR">Goleiro</option>
                  <option value="LR">Linha</option>
                </select>
                <select v-model="player.hability">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="button-group">
          <div class="btn-cancel" v-if="!edit" @click="cancel">
            <span>Cancelar</span>
            <IconClose />
          </div>
          <div class="btn-add" v-if="!edit" @click="generateTeam" :disabled="edit">
            <span>Gerar Times</span>
            <IconAdd />
          </div>
          <div class="btn-add" v-if="edit" @click="edit = false">
            <span>Editar</span>
            <IconEdit />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import IconClose from '../../Icons/IconClose.vue'
import IconAdd from '../../Icons/IconAdd.vue'
import IconEdit from '../../Icons/IconEdit.vue'
import IconSearch from '../../Icons/IconSearch.vue'
import IconAngle from '../../Icons/IconAngle.vue'
import Loading from '../../Loading/LoadingScreen'

export default {
  components: {
    IconClose,
    IconAdd,
    IconEdit,
    IconSearch,
    IconAngle,
    Loading
  },
  props: ['id'],
  data () {
    return {
      player: [],
      error: [],
      name: null,
      numberPlayer: null,
      playerTeam: null,
      qttTeam: null,
      edit: false,
      recallFirst: false,
      loading: true,
      totalHability: 0,
      averageHability: 0,
      players: []
    }
  },
  async mounted () {
    if (this.id !== 'new') {
      await this.getMounted()
    }
    this.loading = false
  },
  methods: {
    async getMounted () {
      this.edit = true
      this.loading = false
    },
    async cancel () {
      await this.getMounted()
    },
    async generateTeam () {
      const bestPlayers = []
      const goodPlayers = []
      const mediumPlayers = []
      const badPlayers = []
      this.totalHability = this.players.map(x => Number(x.hability)).reduce((acc, cur) => acc + cur)
      this.averageHability = this.totalHability / this.qttTeam
      this.players.map(x => {
        if(Number(x.hability) === 10) {
          bestPlayers.push(x)
        } else if (Number(x.hability) >= 7 || Number(x.hability) < 10) {
          goodPlayers.push(x)
        } else if (Number(x.hability) > 4 || Number(x.hability) < 7) {
          mediumPlayers.push(x)
        } else {
          badPlayers.push(x)
        }
        return x
      })
      const bestPlayerLimit = this.averageHability / bestPlayers.length
      const goodPlayerLimit = this.averageHability * 0.3
      const team1 = []
      const team2 = []
      if(bestPlayers.length > 0) {
        bestPlayers.map((x, i) => {
          if(i === 0) {
            team1.push(x)
            team2.push(x[i + 1])
          }
          if(team1 && team1.map(x => Number(x.hability)).reduce((acc, cur) => acc + cur) < bestPlayerLimit) {
            team1.push(x)
          } else if (team2 && team2.map(x => Number(x.hability)).reduce((acc, cur) => acc + cur) < bestPlayerLimit) {
            team2.push(x)
          }
          return x
        })
      }
      if(goodPlayers.length > 0) {
        goodPlayers.map((x, i) => {
          if(i === 0) {
            team1.push(x)
            team2.push(x[i + 1])
          }
          if(team1.map(x => Number(x.hability)).reduce((acc, cur) => acc + cur) < goodPlayerLimit) {
            team1.push(x)
          } else if (team2.map(x => Number(x.hability)).reduce((acc, cur) => acc + cur) < goodPlayerLimit) {
            team2.push(x)
          }
          return x
        })
      }
      // } else if(mediumPlayers.length > 0) {
      //   team1.push(mediumPlayers[0])
      // } else {
      //   team1.push(badPlayers[0])
      // }
      console.log(team1)
      console.log(team2)
    },
    async generateInputs () {
      for(let x = 0; x < this.numberPlayer; x++) {
        const player = {'id': x, 'name': null, 'position': null, 'hability': 1}
        this.players.push(player)
      }
    },
    async generateNumbersTeams () {
      if (this.numberPlayer && this.playerTeam) {
        if (Number(this.numberPlayer) > Number(this.playerTeam) ) {
          this.qttTeam = Math.round(this.numberPlayer / this.playerTeam)
        }
      }
    }
  }
}
</script>
