<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Permitir Jogador
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
          <div class="btn-add" @click="joinTeam">
            <span>Adicionar ao Time</span>
            <IconAdd />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { get, update } from '../api/teamAccept'

export default {
  props: ['id', 'acceptId'],
  data () {
    return {
      team: [],
      error: [],
      name: null,
      phone: null,
      player: null,
      teamId: null,
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
    async joinTeam() {
      this.loading = true
      await update (
        this.id,
        this.teamId,
        this.player,
        true
      )
      this.getMounted()
      this.loading = false
    },
    async getMounted () {
      this.team = await get(this.acceptId)
      this.name = this.team.name
      this.phone = this.team.phone
      this.player = this.team.player
      this.teamId = this.team.team
    },
    async cancel () {
      this.$router.push(`/team`)
    }
  }
}
</script>
