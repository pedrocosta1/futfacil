<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Detalhes do Campo alugado
        </div>
        <div class="close" @click="$router.push(`/players/${id}`)">
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
                <label>Dia</label>
                <input v-model="date" disabled type="date">
              </div>
              <div class="form-group">
                <label>Hora Inicial</label>
                <input v-model="hourIni" disabled type="time">
              </div>
              <div class="form-group">
                <label>Hora Final</label>
                <input v-model="hourEnd" disabled type="time">
              </div>
              <div class="form-group">
                <label>Preço Final</label>
                <money v-model="finalPrice" disabled></money>
              </div>
            </div>
          </div>
        </div>
        <div class="button-group">
          <div class="btn-cancel" @click="cancel">
            <span>Voltar</span>
            <IconClose />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { get } from '../api/rent'

export default {
  props: ['id', 'rentId'],
  data () {
    return {
      rent: [],
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
      finalPrice: 0,
      loading: true,
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
      this.rent = await get(this.rentId)
      this.date = this.rent.date.split('T')[0]
      this.hourIni = this.rent.hourIni.split('T')[1].split(':')[0] + ':' + this.rent.hourIni.split('T')[1].split(':')[1]
      this.hourEnd = this.rent.hourEnd.split('T')[1].split(':')[0] + ':' + this.rent.hourEnd.split('T')[1].split(':')[1]
      this.finalPrice = this.rent.price
    },
    async cancel () {
      await this.getMounted()
      this.$router.push(`/players/${this.id}/rented`)
    }
  }
}
</script>
