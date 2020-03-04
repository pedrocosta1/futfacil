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
import IconClose from '../../Icons/IconClose.vue'
import IconSearch from '../../Icons/IconSearch.vue'
import { getRentedListPlayer } from '../api/fieldList'

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
        String(field.day).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(field.hourIni).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(field.hourEnd).toUpperCase().startsWith(this.search.toUpperCase())
      })
    },
    ...mapState(['player'])
  },
  async mounted () {
    this.fields = await getRentedListPlayer(this.player.id)
    this.fields.map(x => {
      x.hourIni = x.hourIni.split('T')[1]
      x.hourIni = x.hourIni.split(':')[0] + ':' + x.hourIni.split(':')[1]
      x.hourEnd = x.hourEnd.split('T')[1]
      x.hourEnd = x.hourEnd.split(':')[0] + ':' + x.hourEnd.split(':')[1]
      return x
    })
    this.loading = false
  }
}
</script>
