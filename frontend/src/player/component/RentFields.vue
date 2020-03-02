<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Campos Disponiveis
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
          <tr v-for="field in filteredFields" :key="field.id" @click="$router.push(`/rent/${field.id}`)">
            <td>{{field.name}}</td>
            <td class="td-hidden">{{field.type}}</td>
            <td>{{field.maxPerson}}</td>
            <td>R${{field.price}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import IconClose from '../../Icons/IconClose.vue'
import IconSearch from '../../Icons/IconSearch.vue'
import { getFields } from '../api/field'

export default {
  components: {
    IconClose,
    IconSearch,
  },
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
        String(field.phone).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(field.state).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(field.city).toUpperCase().startsWith(this.search.toUpperCase())
      })
    }
  },
  async mounted () {
    this.fields = await getFields()
    this.loading = false
  }
}
</script>
