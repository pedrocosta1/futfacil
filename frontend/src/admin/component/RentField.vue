<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Alugar Campo
        </div>
        <div class="close" @click="$router.push(`/players/${id}/fields`)">
          <IconClose/>
        </div>
      </div>
      <div class="content">
        <div class="section first-section">
          <div class="section-header" @click="recallFirst = !recallFirst">
            <span class="title">Infomações do Campo</span>
            <IconAngle :class="recallFirst ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallFirst ? 'recall' : 'recall-body'">
            <div class="form">
              <div class="form-group">
                <label>Nome</label>
                <input v-model="name" disabled>
                <span v-if="error.indexOf('name') > -1">Ops! Ta faltando o nome</span>
              </div>
              <div class="form-group">
                <label>Tipo</label>
                <input v-model="type" disabled>
                <span v-if="error.indexOf('type') > -1">Ops! Ta faltando o Tipo</span>
              </div>
              <div class="form-group">
                <label>Preço</label>
                <money v-model="price" disabled></money>
                <span v-if="error.indexOf('price') > -1">Ops! Ta faltando o Preço</span>
              </div>
            </div>
          </div>
        </div>
        <div class="section first-section">
          <div class="section-header" @click="recallSecond = !recallSecond">
            <span class="title">Horários Disponiveis</span>
            <IconAngle :class="recallSecond ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallSecond ? 'recall' : 'recall-body'">
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
          <div class="btn-cancel" @click="cancel">
            <span>Cancelar</span>
            <IconClose />
          </div>
          <div class="btn-add" @click="save">
            <span>Alugar</span>
            <IconAdd />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { get } from '../api/field'
import { create } from '../api/rent'
import { getAll as getList, get as getListId, create as createList, update as updateList } from '../api/fieldList'

export default {
  props: ['id', 'fieldId'],
  data () {
    return {
      field: [],
      error: [],
      name: null,
      type: null,
      size: null,
      maxPerson: null,
      price: 0,
      date: null,
      hourIni: null,
      hourEnd: null,
      recallFirst: false,
      recallSecond: true,
      allFieldList: [],
      fieldList: [],
      day: null,
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
      loading: true
    }
  },
  async mounted () {
    if (this.id !== 'new') {
      await this.getMounted()
    }
  },
  methods: {
    async save (id) {
      try {
        const listField = await getListId(id)
        this.date = listField.hourEnd
        this.hourEnd = listField.hourEnd
        this.hourIni = listField.hourIni
        await create(
          this.id,
          this.fieldId,
          this.price,
          this.date,
          this.hourIni,
          this.hourEnd
        )
        this.$router.push(`/players/${this.id}`)
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
    },
    async getFiltered(day) {
      this.fieldList = this.allFieldList.filter(x => x.day === day)
    },
    async calculatePrice () {
      if (this.hourIni && this.hourEnd) {
        const totalHourEnd = this.hourEnd.split(':')
        const hourEndFinal = totalHourEnd[0] + totalHourEnd[1]
        const totalHourIni = this.hourIni.split(':')
        const hourIniFinal = (totalHourIni[0] + totalHourIni[1])
        this.finalPrice = ((hourEndFinal - hourIniFinal) / 100) * this.price
      }
    },
    async getMounted () {
      this.allFieldList = await getList(this.fieldId, false)
      this.fieldList = this.allFieldList.map(x => {
        x.hourIni = x.hourIni.split('T')[1].split(':')[0] + ':' + x.hourIni.split('T')[1].split(':')[1]
        x.hourEnd = x.hourEnd.split('T')[1].split(':')[0] + ':' + x.hourEnd.split('T')[1].split(':')[1]
        return x
      })
      this.field = await get(this.fieldId)
      this.name = this.field.name
      this.type = this.field.type
      this.size = this.field.size
      this.maxPerson = this.field.maxPerson
      this.price = this.field.price
      this.loading = false
    },
    async cancel () {
      await this.getMounted()
    }
  }
}
</script>
