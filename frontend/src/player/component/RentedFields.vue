<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Campos Disponiveis
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
            <th>Nome do Jogador</th>
            <th class="td-hidden">Dia</th>
            <th>Hora Inicial</th>
            <th>Hora Final</th>
          </thead>
          <tr v-for="field in filteredFields" :key="field.id" @click="$router.push(`/rented/${field.id}`)">
            <td>{{field.name}}</td>
            <td class="td-hidden">{{field.day}}</td>
            <td>{{field.hourIni}}</td>
            <td>{{field.hourEnd}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { getRentedListPlayer,  } from '../api/fieldList'
import { updateRent } from '../api/rent'

export default {
  data () {
    return {
      fields: [],
      search: '',
      loading: true,
      today: '',
      days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
    }
  },
  computed: {
    filteredFields () {
      return this.fields.filter((field) => {
        return String(field.name).toUpperCase().includes(this.search.toUpperCase()) ||
        String(field.id).includes(this.search) ||
        String(field.day).toUpperCase().includes(this.search.toUpperCase()) ||
        String(field.hourIni).toUpperCase().includes(this.search.toUpperCase()) ||
        String(field.hourEnd).toUpperCase().includes(this.search.toUpperCase())
      })
    },
    ...mapState(['player'])
  },
  async mounted () {
    const data = new Date()
    const today = this.days[data.getDay()]
    this.fields = await getRentedListPlayer(this.player.id)
    this.fields.map(y => {
      if(today === 'Terça') if(y.day === 'Segunda') this.updateRentWrapper(y.id)
      else if(today === 'Quarta') if(y.day === 'Terca') this.updateRentWrapper(y.id)
      else if(today === 'Quinta') if(y.day === 'Quarta') this.updateRentWrapper(y.id)
      else if(today === 'Sexta') if(y.day === 'Quinta') this.updateRentWrapper(y.id)
      else if(today === 'Sabado') if(y.day === 'Sexta') this.updateRentWrapper(y.id)
      else if(today === 'Domingo') if(y.day === 'Sabado') this.updateRentWrapper(y.id)
      else { if(y.day === 'Domingo') this.updateRentWrapper(y.id) }
    })
    this.fields.map(x => {
      x.hourIni = x.hourIni.split('T')[1]
      x.hourIni = x.hourIni.split(':')[0] + ':' + x.hourIni.split(':')[1]
      x.hourEnd = x.hourEnd.split('T')[1]
      x.hourEnd = x.hourEnd.split(':')[0] + ':' + x.hourEnd.split(':')[1]
      return x
    })
    this.loading = false
  },
  methods: {
    async updateRentWrapper (id) {
      this.loading = true
      await this.updateRentWrap(id)
    },
    async updateRentWrap(id) {
      await updateRent(id)
    }
  }
}
</script>
