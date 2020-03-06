<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Habilidade
        </div>
        <div class="close" @click="$router.push('/players')">
          <IconClose/>
        </div>
      </div>
      <div class="content">
        <div class="section first-section">
          <div class="section-header" @click="recallFirst = !recallFirst">
            <span class="title">Detalhes</span>
            <IconAngle :class="recallFirst ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallFirst ? 'recall' : 'recall-body'">
            <form class="form" enctype="multipart/form-data">
              <div class="form-group">
                <label>Nome</label>
                <input v-model="name" :disabled="edit">
                <span v-if="error.indexOf('name') > -1">Ops! Ta faltando o nome</span>
              </div>
              <div class="form-group">
                <label>Velocide / Ritmo</label>
                <input v-model="pac" v-mask="['##']" :disabled="edit">
                <span v-if="error.indexOf('pac') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>Chute</label>
                <input v-model="shot" v-mask="['##']" :disabled="edit">
                <span v-if="error.indexOf('shot') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>Passe</label>
                <input v-model="pas" v-mask="['##']" :disabled="edit">
                <span v-if="error.indexOf('pas') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>Drible</label>
                <input v-model="dri" v-mask="['##']" :disabled="edit">
                <span v-if="error.indexOf('dri') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>Defesa</label>
                <input v-model="def" v-mask="['##']" :disabled="edit">
                <span v-if="error.indexOf('def') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>Fisico</label>
                <input v-model="phy" v-mask="['##']" :disabled="edit">
                <span v-if="error.indexOf('phy') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>Nacionalidade</label>
                <select v-model="nacionality" :disabled="edit">
                  <option v-for="nacio in nacionalities" :key="nacio.code" :value="nacio.code">{{nacio.name}}</option>
                </select>
                <span v-if="error.indexOf('nacionality') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>Time</label>
                <select v-model="club" :disabled="edit">
                  <option v-for="team in teams" :key="team.id" :value="team.idApi">{{team.name}}</option>
                </select>
                <span v-if="error.indexOf('club') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>Foto</label>
                <input :disabled="edit" type="file" name="profile" @change="onFileChange">
                <span v-if="error.indexOf('club') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group" v-if="editable">
                <Card :id="id" :change="variable" />
              </div>
            </form>
          </div>
        </div>
        <div class="button-group">
          <div class="btn-cancel" v-if="!edit" @click="cancel">
            <span>Cancelar</span>
            <IconClose />
          </div>
          <div class="btn-add" v-if="!edit" @click="save" :disabled="edit">
            <span>Adicionar</span>
            <IconAdd />
          </div>
          <div class="btn-cancel" v-if="edit" @click="$router.push(`/players/${id}`)">
            <span>Voltar</span>
            <IconClose />
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
import { getAll, get, create, update } from '../api/hability'
import { getCep } from '../api/searchCep'
import Card from './Card'
import Loading from '../../Loading/LoadingScreen'

export default {
  components: {
    IconClose,
    IconAdd,
    IconEdit,
    IconSearch,
    IconAngle,
    Loading,
    Card
  },
  props: ['id'],
  data () {
    return {
      habilityPlayer: [],
      nacionalities: [],
      teams: [],
      pac: 32,
      shot: 123,
      pas: 1,
      dri: 23,
      def: 23,
      phy: 23,
      photo: null,
      overall: null,
      name: 'Pedroca',
      nacionality: null,
      club: null,
      photo: null,
      edit: false,
      recallFirst: false,
      loading: true,
      editable: false,
      variable: true,
      error: []
    }
  },
  async mounted () {
    await this.getMounted()
  },
  methods: {
    async save () {
      try {
        this.overall = parseFloat(Math.floor((
          Number(this.pac) + 
          Number(this.shot) + 
          Number(this.pas) + 
          Number(this.dri) + 
          Number(this.def) + 
          Number(this.phy)) / 6).toFixed(2))
        await create(
            this.id,
            this.pac,
            this.shot,
            this.pas,
            this.dri,
            this.def,
            this.phy,
            this.photo,
            this.overall,
            this.name,
            this.nacionality,
            this.club,
            this.editable
          )
          this.editable = false
          this.variable = !this.variable
          await this.getMounted()
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
    },
    async onFileChange (event) {
      this.photo = event.target.files[0]
    },
    async getMounted () {
      this.loading = true
      this.allObject = await getAll()
      this.nacionalities = this.allObject[0]
      this.teams = this.allObject[1]
      this.habilityPlayer = await get(this.id)
      if(this.habilityPlayer) {
        this.editable = true
        this.club = this.habilityPlayer.club
        this.def = this.habilityPlayer.def
        this.dri = this.habilityPlayer.dri
        this.nacionality = this.habilityPlayer.nacionality
        this.name = this.habilityPlayer.name
        this.overall = this.habilityPlayer.overall
        this.pac = this.habilityPlayer.pac
        this.pas = this.habilityPlayer.pas
        this.photo = this.habilityPlayer.photo
        this.phy = this.habilityPlayer.phy
        this.shot = this.habilityPlayer.shot
      }
      this.edit = true
      this.loading = false
    },
    async cancel () {
      await this.getMounted()
    }
  }
}
</script>

<style lang="scss" scoped>
  .svg-search {
    width: 50px;
  }

  .search {
    input {
      &:focus {
        border: none;
      }
      padding: 5px 10px;
      &:disabled {
        background: none
      }
    }
  }
  .disabled {
    background: #ebebe4;
  }
</style>