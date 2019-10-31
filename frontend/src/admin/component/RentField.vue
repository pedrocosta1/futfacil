<template>
  <section class="router-view">
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
            <span class="title">Detalhes</span>
            <IconAngle :class="recallSecond ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallSecond ? 'recall' : 'recall-body'">
            <div class="form">
              <div class="form-group">
                <label>Dia</label>
                <input v-model="date" type="date">
                <span v-if="error.indexOf('date') > -1">Ops! Ta faltando o Tamanho</span>
              </div>
              <div class="form-group">
                <label>Hora Inicial</label>
                <input v-model="hourIni" type="time">
                <span v-if="error.indexOf('hourIni') > -1">Ops! Ta faltando o Maximo de Pessoas</span>
              </div>
              <div class="form-group">
                <label>Hora Final</label>
                <input v-model="hourEnd" type="time">
                <span v-if="error.indexOf('hourEnd') > -1">Ops! Ta faltando o Maximo de Pessoas</span>
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
  </section>
</template>

<script>
import IconClose from '../../Icons/IconClose.vue'
import IconAdd from '../../Icons/IconAdd.vue'
import IconAngle from '../../Icons/IconAngle.vue'
import { get } from '../api/field'
import { create } from '../api/rent'


export default {
  components: {
    IconClose,
    IconAdd,
    IconAngle
  },
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
      recallSecond: true
    }
  },
  async mounted () {
    if (this.id !== 'new') {
      await this.getMounted()
    }
  },
  methods: {
    async save () {
      try {
        await create(
          this.id,
          this.fieldId,
          this.price,
          this.date,
          this.hourIni,
          this.hourEnd
        )
        this.$router.push(`/players/${this.id}/fields`)
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
    },
    async getMounted () {
      this.field = await get(this.fieldId)
      this.name = this.field.name
      this.type = this.field.type
      this.size = this.field.size
      this.maxPerson = this.field.maxPerson
      this.price = this.field.price
    },
    async cancel () {
      await this.getMounted()
    }
  }
}
</script>
