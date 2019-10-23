<template>
  <section id="main">
    <div class="menu-container">
      <div class="menu">
        <div class="menu-item" @click="$router.push('/clients')">
          Clientes
        </div>
      </div>
      <div class="router-view">
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
              <input type="text">
              <IconSearch class="svg-search"/>
          </div>
          <div class="btn-svg" @click="$router.push('/clients/new')">
            <IconAdd class="svg-add"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { removeToken, loadModule } from '../../util'
import IconClose from '../../Icons/IconClose.vue'
import IconAdd from '../../Icons/IconAdd.vue'
import IconSearch from '../../Icons/IconSearch.vue'
import { getAll } from '../api/client'

export default {
  components: {
    IconClose,
    IconAdd,
    IconSearch
  },
  data () {
    return {
      clients: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted () {
    this.clients = await getAll()
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
