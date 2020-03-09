<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Campos Alugados
        </div>
        <div class="close" @click="$router.push(`/players/${id}`)">
          <IconClose/>
        </div>
      </div>
      <div class="header-search">
        <div class="search">
            <input type="text" v-model="search">
            <IconSearch class="svg-search"/>
        </div>
      </div>
      <div class="table">
        <table>
          <thead>
            <td>Nome</td>
            <td>Dia</td>
            <td>Hora Inicial</td>
            <td>Hora Final</td>
            <td>Preço</td>
          </thead>
          <tr v-for="rent in filteredRents" :key="rent.id" @click="$router.push(`/players/${id}/rented/${rent.id}`)">
            <td>{{rent.name}}</td>
            <td>{{rent.date}}</td>
            <td>{{rent.hourIni}}</td>
            <td>{{rent.hourEnd}}</td>
            <td>R${{rent.price}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { getAll } from '../api/rent'

export default {
  props: ['id', 'rentId'],
  data () {
    return {
      rents: [],
      search: '',
      loading: true
    }
  },
  computed: {
    filteredRents () {
      return this.rents.filter((rent) => {
        return String(rent.name).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(rent.date).includes(this.search) ||
        String(rent.hourIni).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(rent.hourEnd).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(rent.price).toUpperCase().startsWith(this.search.toUpperCase())
      })
    }
  },
  async mounted () {
    this.rents = await getAll(this.id)
    this.rents.map(x => {
      x.date = x.date.split('T')[0]
      x.date = x.date.split('-')[2]
      x.hourIni = x.hourIni.split('T')[1]
      x.hourIni = x.hourIni.split(':')[0] + ':' + x.hourIni.split(':')[1]
      x.hourEnd = x.hourEnd.split('T')[1]
      x.hourEnd = x.hourEnd.split(':')[0] + ':' + x.hourEnd.split(':')[1]
    })
    this.loading = false
  }
}
</script>
