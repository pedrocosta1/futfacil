<template>
  <section id="main">
    <div class="menu-container">
      <div class="menu">
        <div class="menu-item" @click="changeRoute">
          Clientes
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { removeToken, loadModule } from '../../util'

export default {
  computed: {
    ...mapState(['user'])
  },
  methods: {
    signOut () {
      this.$store.commit('user', null)
      this.$root.$destroy()
      removeToken()
      loadModule('core')
    },
    changeRoute () {
      this.$router.push('/clients')
    }
  }
}
</script>
