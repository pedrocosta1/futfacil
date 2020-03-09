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
      </div>
      <div class="table">
        <table>
          <tr v-for="log in filteredLogs" :key="log.id" @click="$router.push(`/logs/${log.id}`)">
            <td v-if="log.level === 'info'"><span class="svg-circle" style="color: blue"><IconInfo/></span></td>
            <td v-if="log.level === 'warn'"><span class="svg-circle" style="color: yellow"><IconWarning/></span></td>
            <td v-if="log.level === 'error'"><span class="svg-circle" style="color: red"><IconClose/></span></td>
            <td>{{log.info}}</td>
            <td>{{log.from}}</td>
            <td>{{log.message}}</td>
            <td>{{log.date}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { getAll } from '../api/log'

export default {
  data () {
    return {
      data: [],
      logs: [],
      search: '',
      loading: true,
      busy: false
    }
  },
  computed: {
    filteredLogs () {
      return this.logs.filter((log) => {
        return String(log.name).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(log.id).includes(this.search) ||
        String(log.message).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(log.info).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(log.date).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(log.level).toUpperCase().startsWith(this.search.toUpperCase()) ||
        String(log.from).toUpperCase().startsWith(this.search.toUpperCase())
      })
    }
  },
  async mounted () {
    this.logs = await getAll()
    this.loading = false
  }
}
</script>
<style lang="scss" scoped>
  .svg-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    svg {
      width: 20px;
      height: 20px;
    }
  }
</style>
