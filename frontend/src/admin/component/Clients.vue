<template>
  <section class="router-view">
  <Loading v-if="loading"/> 
    <div v-if="!loading" class="main-content">
      <div class="header">
        <div class="title">
          Client
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
        <div class="btn-svg" @click="$router.push('/clients/new')">
          <IconAdd class="svg-add"/>
        </div>
      </div>
      <div class="table">
        <table>
          <tr v-for="client in filteredClients" :key="client.id" @click="$router.push(`/clients/${client.id}`)">
            <td>{{client.name}}</td>
            <td class="td-hidden">{{client.phone}}</td>
            <td>{{client.city}}</td>
            <td>{{client.state}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { getAll } from '../api/client'

export default {
  data () {
    return {
      clients: [],
      search: '',
      loading: true
    }
  },
  computed: {
    filteredClients () {
      return this.clients.filter((client) => {
        return String(client.name).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(client.id).includes(this.search) ||
        String(client.phone).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(client.state).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(client.city).toUpperCase().startsWith(this.search.toUpperCase())
      })
    }
  },
  async mounted () {
    this.clients = await getAll()
    this.loading = false
  }
}
</script>
