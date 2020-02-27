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

export default {
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      id: null,
      loading: true
    }
  },
  mounted () {
    this.id = this.user.id
    this.loading = false
  }
}
</script>
