<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Listagem de campos
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
        <div class="btn-svg" @click="$router.push(`/clients/${client}/fields/new`)">
          <IconAdd class="svg-add"/>
        </div>
      </div>
      <div class="table">
        <table>
          <tr v-for="field in filteredFields" :key="field.id" @click="$router.push(`/clients/${client}/fields/${field.id}`)">
            <td>{{field.name}}</td>
            <td>{{field.type}}</td>
            <td>R$ {{field.price}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { removeToken, loadModule } from '../../util'
import { getAll } from '../api/field'

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
        String(field.type).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(field.price).toUpperCase().startsWith(this.search.toUpperCase())
      })
    }
  },
  async mounted () {
    this.fields = await getAll(this.client)
    this.loading = false
  },
  methods: {
    signOut () {
      this.$store.commit('user', null)
      this.$root.$destroy()
      removeToken()
      loadModule('core')
    }
  }
}
</script>
