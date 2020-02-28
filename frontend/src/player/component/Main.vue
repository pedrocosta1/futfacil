<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <Card :id=id />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { get } from '../api/player'

export default {
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      id: null,
      loading: true,
      player: null
    }
  },
  async mounted () {
    this.id = this.user.id
    this.player = await get(this.id)
    this.$store.commit('player', this.player)
    this.loading = false
  }
}
</script>
