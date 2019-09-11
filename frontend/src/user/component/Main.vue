<template>
  <section id="main">
    AREA DO USUÁRIO {{ user.login }}
    <button @click="signOut" type="button">Sair</button>
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
    }
  }
}
</script>
