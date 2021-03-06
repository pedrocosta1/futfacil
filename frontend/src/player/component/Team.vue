<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Criar um Time
        </div>
        <div class="close" @click="$router.push(`/team`)">
          <IconClose/>
        </div>
      </div>
      <div class="content">
        <div class="section first-section">
          <div class="section-header" @click="recallFirst = !recallFirst">
            <span class="title">Infomações do Time</span>
            <IconAngle :class="recallFirst ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallFirst ? 'recall' : 'recall-body'">
            <div class="form">
              <div class="group-two">
                <div class="form-group">
                  <label>Nome do Time</label>
                  <input v-model="name" :disabled="edit" style="width: 97%" :class="error.indexOf('name') > -1 ? 'input-error' : ''">
                  <span class="span-error" v-if="error.indexOf('name') > -1">Ops! Ta faltando o Nome.</span>
                </div>
                <div class="box-body image-team" v-if="id !== 'new'">
                  <div class="box-image">
                    <img :src="logo">
                  </div>
                </div>
              </div>
              <div class="form-group" v-if="!edit && !apply ">
                <label>Foto</label>
                <input type="file" name="logo" @change="onFileChange" >
              </div>
            </div>
          </div>
        </div>
        <div class="section" @click="$router.push(`/team/${id}/accept`)" v-if="applications">
          <div class="section-header">
            <span class="title">Jogadores Aguardando</span>
            <IconAngle/>
          </div>
        </div>
        <div class="section" @click="$router.push(`/team/${id}/players`)" v-if="applications">
          <div class="section-header">
            <span class="title">Lista de Jogadores</span>
            <IconAngle/>
          </div>
        </div>
        <div class="section" @click="$router.push(`/team/${id}/challenges`)" v-if="applications">
          <div class="section-header">
            <span class="title">Desafiar Times</span>
            <IconAngle/>
          </div>
        </div>
        <div class="section" @click="$router.push(`/team/${id}/challenged`)" v-if="applications">
          <div class="section-header">
            <span class="title">Desafios</span>
            <IconAngle/>
          </div>
        </div>
        <div class="button-group">
          <div class="btn-cancel" v-if="!edit && id !== 'new'" @click="remove">
            <span>Deletar</span>
            <IconClose />
          </div>
          <div class="btn-cancel" v-if="!edit" @click="cancel">
            <span>Cancelar</span>
            <IconClose />
          </div>
          <div class="btn-add" v-if="!edit && !apply " @click="save" :disabled="edit">
            <span>Adicionar</span>
            <IconAdd />
          </div>
          <div class="btn-add" v-if="edit && applications" @click="edit = false">
            <span>Editar</span>
            <IconEdit />
          </div>
          <div class="btn-add" v-if="apply" @click="joinTeam">
            <span>Aplicar</span>
            <IconEdit />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { get, create, update, remove } from '../api/team'
import { create as createApplication } from '../api/teamAccept'

export default {
  props: ['id'],
  computed: {
    ...mapState(['player'])
  },
  data () {
    return {
      team: [],
      error: [],
      name: null,
      logo: null,
      recallFirst: false,
      loading: true,
      edit: false,
      apply: false,
      applications: false,
      photo: null
    }
  },
  async mounted () {
    if (this.id !== 'new') {
      await this.getMounted()
    }
    this.loading = false
  },
  methods: {
    async save () {
      this.loading = true
      try {
        this.error = []
        if (this.id !== 'new') {
          await update(
            this.id,
            this.name,
            this.player.id,
            this.photo
          )
          this.edit = true
        } else {
          await create(
            this.name,
            this.player.id,
            this.photo
          )
          this.$router.push(`/team`)
        }
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
      this.loading = false
    },
    async onFileChange (event) {
      this.photo = event.target.files[0]
    },
    async joinTeam() {
      this.loading = true
      await createApplication (
        this.id,
        this.player.id,
        false
      )
      this.getMounted()
      this.loading = false
    },
    async remove() {
      this.loading = true
      await remove (
        this.id,
        false
      )
      this.$router.push(`/team`)
    },
    async getMounted () {
      this.team = await get(this.id)
      if(this.team.player === this.player.id) {
        this.applications = true
      } else {
        this.apply = true
      }
      this.edit = true
      this.name = this.team.name
      if(this.team.logo) { 
        this.logo = 'img/teams/' + this.team.logo
        this.photo = true 
      } else {
        this.logo = 'img/teams/team_default.png'
      }
      this.loading = false
    },
    async cancel () {
      this.$router.push(`/team`)
    }
  }
}
</script>
<style lang="scss" scoped>
  .box-body {
    width: 50%;
    .box-image {
      width: 100%;
      img {
        padding: 0px;
      }
    }
  }
  
</style>