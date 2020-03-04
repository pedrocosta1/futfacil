<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Detalhes do Jogador
        </div>
        <div class="close" @click="$router.push(`/team`)">
          <IconClose/>
        </div>
      </div>
      <div class="content">
        <div class="section first-section">
          <div class="section-header" @click="recallFirst = !recallFirst">
            <span class="title">Infomações do Jogador</span>
            <IconAngle :class="recallFirst ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallFirst ? 'recall' : 'recall-body'">
            <div class="form">
               <div class="form-group">
                <label>Nome</label>
                <input v-model="name" disabled>
              </div>
              <div class="form-group">
                <label>Telefone</label>
                <input v-model="phone" v-mask="['(##) ####-####', '(##) #####-####']" disabled>
              </div>
            </div>
            <Card :id="player"/>
          </div>
        </div>
        <div class="button-group">
          <div class="btn-cancel" v-if="!edit" @click="cancel">
            <span>Voltar</span>
            <IconClose />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import IconClose from '../../Icons/IconClose.vue'
import IconAngle from '../../Icons/IconAngle.vue'
import IconAdd from '../../Icons/IconAdd.vue'
import { get } from '../api/teamPlayers'

export default {
  components: {
    IconClose,
    IconAngle,
    IconAdd
  },
  props: ['id', 'playerId'],
  data () {
    return {
      team: [],
      error: [],
      name: null,
      phone: null,
      player: null,
      recallFirst: false,
      loading: true,
      edit: false,
    }
  },
  async mounted () {
    await this.getMounted()
    this.loading = false
  },
  methods: {
    async getMounted () {
      this.team = await get(this.playerId)
      this.name = this.team.name
      this.phone = this.team.phone
      this.player = this.team.player
    },
    async cancel () {
      this.$router.push(`/team/${this.id}/players`)
    }
  }
}
</script>
