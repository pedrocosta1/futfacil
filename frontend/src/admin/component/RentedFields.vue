<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Campos Disponiveis
        </div>
        <div class="close" @click="$router.push(`/clients/${client}`)">
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
          <tr v-for="field in filteredFields" :key="field.id" @click="$router.push(`/clients/${client}/rentedfields/${field.id}`)">
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
import { getRentedList } from '../api/fieldList'

export default {
  props: ['client'],
  data () {
    return {
      fields: [],
      search: '',
      loading: true
    }
  },
  computed: {
    filteredFields () {
      return this.fields.filter((field) => {
        return String(field.name).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(field.id).includes(this.search) ||
        String(field.day).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(field.hourIni).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(field.hourEnd).toUpperCase().startsWith(this.search.toUpperCase())
      })
    }
  },
  async mounted () {
    this.fields = await getRentedList(this.client)
    this.fields.map(x => {
      x.hourIni = x.hourIni.split('T')[1]
      x.hourIni = x.hourIni.split(':')[0] + ':' + x.hourIni.split(':')[1]
      x.hourEnd = x.hourEnd.split('T')[1]
      x.hourEnd = x.hourEnd.split(':')[0] + ':' + x.hourEnd.split(':')[1]
      return x
    })
    console.log(this.fields)
    this.loading = false
  }
}
</script>
