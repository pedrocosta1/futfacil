<template>
  <section class="router-view">
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
                <input v-model="date" type="date">
              </div>
              <div class="form-group">
                <label>Hora Inicial</label>
                <input v-model="hourIni" type="time">
              </div>
              <div class="form-group">
                <label>Hora Final</label>
                <input v-model="hourEnd" type="time">
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
  </section>
</template>

<script>
import IconClose from '../../Icons/IconClose.vue'
import IconAngle from '../../Icons/IconAngle.vue'
import { get } from '../api/rent'

export default {
  components: {
    IconClose,
    IconAngle
  },
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
      finalPrice: 0
    }
  },
  async mounted () {
    if (this.id !== 'new') {
      await this.getMounted()
    }
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
    }
  }
}
</script>
