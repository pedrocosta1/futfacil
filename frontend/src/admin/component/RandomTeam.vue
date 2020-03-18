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
                <div class="mini-form">
                  <label>Nº Jogadores</label>
                  <input v-model="numberPlayer" :disabled="edit">
                  <span v-if="error.indexOf('number') > -1">Ops! Ta faltando o nome</span>
                </div>
                <div class="btn" @click="generateInputs">
                  <span>Gerar</span>
                </div>
              </div>
              <div class="form-group same-line" v-for="player in players" :key="player.id">
                <div class="mini-form">
                  <label>Jogador - {{player.id + 1}}</label>
                  <input class="no-limit" v-model="player.name">
                </div>
              </div>
            </div>
            <div class="modal" v-if="showModal" @click="showModal = false">
                <div class="modal-content-add">
                  <div class="modal-header">
                    <span class="title">Divisão de times</span>
                    <div class="close-add" @click="showModal = false">
                      <IconClose/>
                    </div>
                  </div>
                  <div class="form-two-columns">
                    <table class="table">
                      <th>Time 2</th>
                      <tr v-for="t1 in team1" :key="t1.id">
                        <td>{{t1.name}}</td>
                      </tr>
                    </table>
                    <table class="table">
                      <th>Time 1</th>
                      <tr v-for="t2 in team2" :key="t2.id">
                        <td>{{t2.name}}</td>
                      </tr>
                    </table>
                  </div>
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
            <IconView />
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

export default {
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
      players: [],
      team1: [],
      team2: [],
      showModal: false
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
      this.numberPlayer = null
      this.playerTeam = null
      this.qttTeam = null
      this.edit = true
      this.players = []
      this.loading = false
    },
    async cancel () {
      await this.getMounted()
    },
    async generateTeam () {
      var team1 = []
      var team2 = []
      // Projeto para considerar a habilidade do jogador
      // const sumWeight = this.players.map(x => Number(x.hability)).reduce((acc, cur) => acc + cur)
      this.players.map((x, i) => {
        var condicao = true
        var randNumber = Math.floor(Math.random() * this.players.length)
        do {
          if(i === 0) {
            team1.push(this.players[randNumber])
            condicao = false
          } else if (team2.length === 0) {
            if(!team1.find(y => y.id === this.players[randNumber].id)) {
              team2.push(this.players[randNumber])
              condicao = false
            } else {
              randNumber = Math.floor(Math.random() * this.players.length)
            }
          } else if(!team1.find(y => y.id === this.players[randNumber].id)) {
            if(!team2.find(z => z.id === this.players[randNumber].id)) {
              if(team1.length < team2.length) {
                team1.push(this.players[randNumber])
                condicao = false
              } else {
                team2.push(this.players[randNumber])
                condicao = false
              }
            } else {
              randNumber = Math.floor(Math.random() * this.players.length)
            }
          } else {
            randNumber = Math.floor(Math.random() * this.players.length)
          }
        } while (condicao)
      })
      this.team1 = team1
      this.team2 = team2
      this.showModal = true
    },
    async generateInputs () {
      if(this.players.length > 0)
        this.players = []
      for(var x = 0; x < this.numberPlayer; x++) {
        const player = {'id': x, 'name': null, 'position': null, 'hability': 1}
        this.players.push(player)
      }
    }
  }
}
</script>
