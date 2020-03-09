<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Detalhes do Campo alugado
        </div>
        <div class="close" @click="$router.push(`/rentedfields`)">
          <IconClose/>
        </div>
      </div>
      <div class="content">
        <div class="section first-section">
          <div class="section-header" @click="recallFirst = !recallFirst">
            <span class="title">Infomações do Aluguel</span>
            <IconAngle :class="recallFirst ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallFirst ? 'recall' : 'recall-body'">
            <div class="form">
              <div class="form-group">
                <label>Nome</label>
                <input v-model="name" disabled>
              </div>
              <div class="form-group">
                <label>Celular</label>
                <input v-model="phone" disabled>
              </div>
              <div class="form-group">
                <label>Estado</label>
                <input v-model="state" disabled>
              </div>
              <div class="form-group">
                <label>Cidade</label>
                <input v-model="city" disabled>
              </div>
              <div class="form-group">
                <label>Rua</label>
                <input v-model="street" disabled>
              </div>
              <div class="form-group">
                <label>Preço Final</label>
                <money v-model="finalPrice" disabled></money>
              </div>
            </div>
          </div>
        </div>
        <div class="button-group">
          <div class="btn" @click="cancel">
            <span>Voltar</span>
            <IconClose />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getRentedDetails } from '../api/fieldList'

export default {
  props: ['id'],
  data () {
    return {
      details: [],
      error: [],
      name: null,
      city: null,
      phone: null,
      street: null,
      state: null,
      price: 0,
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
      this.details = await getRentedDetails(this.id)
      this.name = this.details.name
      this.phone = this.details.phone
      this.state = this.details.state
      this.city = this.details.city
      this.street = this.details.street
      this.finalPrice = this.details.price
      this.loading = false
    },
    async cancel () {
      this.$router.push(`/renteds`)
    }
  }
}
</script>
