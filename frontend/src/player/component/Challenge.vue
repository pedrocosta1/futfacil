<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title" v-if="!accept">
          {{challenge ? 'Time para Desafiar' : 'Time que o Desafiou'}}
        </div>
        <div class="title" v-if="accept">
          Time Aceito
        </div>
        <div class="close" @click="$router.push(`/team/${id}`)">
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
              <div class="form-group">
                <label>Nome do Time</label>
                <input v-model="name" disabled>
              </div>
              <div class="form-group">
                <label>Logo</label>
                <input v-model="logo" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section-header" @click="recallSecond = !recallSecond">
            <span class="title">Jogadores</span>
            <IconAngle :class="recallSecond ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallSecond ? 'recall' : 'recall-body'">
            <div class="grid-card" v-if="teamPlayers">
              <div class="card" v-for="player in teamPlayers" :key="player.id">
                <Card :id="player.id"/>
              </div>
            </div>
            <div class="grid-card" v-if="!teamPlayers">
              <span>Time sem Jogadores</span>
            </div>
          </div>
        </div>
        <div class="section" v-if="!rented">
          <div class="section-header" @click="recallThird = !recallThird">
            <span class="title">Campo</span>
            <IconAngle :class="recallThird ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallThird ? 'recall' : 'recall-body'" v-if="challenge">
            <select v-model="field" @change="getFreeHours">
              <option v-for="list in fields" :key="list.id" :value="list.id">{{list.name}}</option>
            </select>
            <div class="form">
              <div class="form-group">
                <div class="filter-display">
                  <div class="filter-btn" v-for="day in days" :key="day" @click="getFiltered(day)">
                    <span>{{day}}</span>
                  </div>
                </div>
              </div>
              <div class="table">
                <table>
                  <tr v-for="field in fieldList" :key="field.id" @click="save(field.id)">
                    <td>{{field.day}}</td>
                    <td>{{field.hourIni}}</td>
                    <td>{{field.hourEnd}}</td>
                    <td>{{field.active ? 'Horario Alugado' : 'Horario Vago'}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="section-body" :class="recallThird ? 'recall' : 'recall-body'" v-if="!challenge">
            <div class="form">
              <div class="form-group">
                <label>Nome do Local</label>
                <input v-model="nameField" disabled>
              </div>
              <div class="form-group">
                <label>Celular</label>
                <input v-model="phoneField" disabled>
              </div>
              <div class="form-group">
                <label>Estado</label>
                <input v-model="stateField" disabled>
              </div>
              <div class="form-group">
                <label>Cidade</label>
                <input v-model="cityField" disabled>
              </div>
              <div class="form-group">
                <label>Rua</label>
                <input v-model="streetField" disabled>
              </div>
              <div class="form-group">
                <label>Number</label>
                <input v-model="numberField" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="button-group">
          <div class="btn-cancel" @click="$router.push(`/team/${id}`)">
            <span>Voltar</span>
            <IconClose />
          </div>
          <div class="btn-add" v-if="challenge && !accept" @click="createChallenge">
            <span>Desafiar</span>
            <IconAdd />
          </div>
          <div class="btn-add" v-if="!challenge && !accept" @click="acceptChallenge">
            <span>Aceitar</span>
            <IconEdit />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { get, create, updateAccept } from '../api/challenge'
import { get as getTeam } from '../api/team'
import { getAll as AllPlayers } from '../api/teamPlayers'
import { getFields, get as getField } from '../api/field'
import { getAll as getList, get as getListId } from '../api/fieldList'
import { create as rentField } from '../api/rent'


export default {
  props: ['id', 'idC'],
  computed: {
    ...mapState(['player'])
  },
  data () {
    return {
      team: [],
      error: [],
      teamPlayers: [],
      fieldList: [],
      fields: [],
      accept: false,
      name: null,
      logo: null,
      field: null,
      date: null,
      day: null,
      price: null,
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
      recallFirst: false,
      recallSecond: true,
      recallThird: true,
      loading: true,
      rented: false,
      challenge: true,
      stateField: null,
      cityField: null,
      nameField: null,
      streetField: null,
      phoneField: null,
      numberField: null
    }
  },
  async mounted () {
    await this.getMounted()
  },
  methods: {
    async save (id) {
      try {
        const listField = await getListId(id)
        this.date = listField.hourEnd
        this.hourEnd = listField.hourEnd
        this.hourIni = listField.hourIni
        await rentField(
          this.player.id,
          this.field,
          this.price,
          this.date,
          this.hourIni,
          this.hourEnd,
          listField.day
        )
        this.rented = true
        this.$router.push(`/team/${id}/challenge/${idC}`)
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
    },
    async createChallenge () {
      this.loading = true
      if(!this.rented) {
        alert('selecione um campo')
        this.loading = false
      } else {
        this.date = Date.now()
        await create(
          this.id,
          this.idC,
          this.date,
          this.field,
          null,
          null
        )
        this.$router.push(`/team/${this.id}`)
      }
    },
    async getFiltered(day) {
      this.fieldList = this.allFieldList.filter(x => x.day === day)
    },
    async acceptChallenge() {
      this.loading = true
      await updateAccept (
        this.idC,
        true
      )
      this.getMounted()
    },
    async getMounted () {
      this.fields = await getFields()
      const challenge = await get(this.idC)
      // Caso volte um objeto é um desafio para aceitar
      if(challenge) {
        this.team = await getTeam(challenge.teamId)
        this.teamPlayers = await AllPlayers(challenge.teamId)
        this.nameField = challenge.name
        this.phoneField = challenge.phone
        this.postalField = challenge.postal
        this.stateField = challenge.state
        this.cityField = challenge.city
        this.streetField = challenge.street
        this.numberField = challenge.number
        this.challenge = false
      } else {
        this.team = await getTeam(this.idC)
        this.teamPlayers = await AllPlayers(this.idC)
      }
      if(challenge.accept && !challenge.happend) this.accept = true
      this.name = this.team.name
      this.logo = this.team.logo
      this.loading = false
    },
    async getFreeHours () {
      const fieldData = await getField(this.field)
      this.price = fieldData.price
      this.allFieldList = await getList(this.field, false)
      this.fieldList = this.allFieldList.map(x => {
        x.hourIni = x.hourIni.split('T')[1].split(':')[0] + ':' + x.hourIni.split('T')[1].split(':')[1]
        x.hourEnd = x.hourEnd.split('T')[1].split(':')[0] + ':' + x.hourEnd.split('T')[1].split(':')[1]
        return x
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .grid-card {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
