<template>
  <section class="router-view">
      <div class="header">
        <div class="title">
          Listagem de campos
        </div>
        <div class="close" @click="$router.push('/')">
          <IconClose/>
        </div>
      </div>
      <div class="header-search">
        <div class="search">
            <input type="text" v-model="search">
            <IconSearch class="svg-search"/>
        </div>
        <div class="btn-svg" @click="$router.push('/fields/new')">
          <IconAdd class="svg-add"/>
        </div>
      </div>
      <div class="table">
        <table>
          <tr v-for="field in filteredFields" :key="field.id" @click="$router.push(`/fields/${field.id}`)">
            <td>{{field.name}}</td>
            <td>{{field.type}}</td>
            <td>R$ {{field.price}}</td>
          </tr>
        </table>
      </div>
  </section>
</template>

<script>
import { removeToken, loadModule } from '../../util'
import IconClose from '../../Icons/IconClose.vue'
import IconAdd from '../../Icons/IconAdd.vue'
import IconSearch from '../../Icons/IconSearch.vue'
import { getAll } from '../api/field'

export default {
  components: {
    IconClose,
    IconAdd,
    IconSearch
  },
  data () {
    return {
      fields: [],
      search: ''
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
    this.fields = await getAll()
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
