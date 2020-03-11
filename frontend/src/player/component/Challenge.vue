<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          {{challenge ? 'Time para Desafiar' : 'Time que o Desafiou'}}
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
            <div class="grid-card">
              <div class="card" v-for="player in teamPlayers" :key="player.id">
                <Card :id="player.id"/>
              </div>
            </div>
          </div>
        </div>
        <div class="section" v-if="!rented">
          <div class="section-header" @click="recallThird = !recallThird">
            <span class="title">Campo</span>
            <IconAngle :class="recallThird ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallThird ? 'recall' : 'recall-body'">
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
        </div>
        <div class="button-group">
          <div class="btn-cancel" @click="$router.push(`/team/${id}`)">
            <span>Voltar</span>
            <IconClose />
          </div>
          <div class="btn-add" v-if="challenge" @click="createChallenge">
            <span>Desafiar</span>
            <IconAdd />
          </div>
          <div class="btn-add" v-if="!challenge" @click="joinTeam">
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
import { get, create } from '../api/challenge'
import { get as getTeam } from '../api/team'
import { getAll as AllPlayers } from '../api/teamPlayers'
import { getFields } from '../api/field'
import { getAll as getList, get as getListId } from '../api/fieldList'
import { get as getField } from '../api/field'
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
      challenge: true
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
    },
    async getFiltered(day) {
      this.fieldList = this.allFieldList.filter(x => x.day === day)
    },
    async joinTeam() {
      this.loading = true
      await createApplication (
        this.id,
        this.player.id,
        false
      )
      this.getMounted()
    },
    async getMounted () {
      this.fields = await getFields()
      this.team = await getTeam(this.idC)
      if(this.team.player === this.player.id) {
        this.challenge = await get(this.idC)
        this.challenge = false
      } else {
        this.teamPlayers = await AllPlayers(this.idC)
      }
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
