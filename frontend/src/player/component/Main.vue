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
    ...mapState(['user']),
    ...mapState(['player'])
  },
  data () {
    return {
      id: null,
      loading: true,
      playerData: null
    }
  },
  async mounted () {
    if(this.user && this.player) {
      this.id = this.player.id
      this.loading = false
    } 
  }
}
</script>
