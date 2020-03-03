<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <testChart/>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import testChart from '../charts/testChart'

export default {
  components: {
    testChart
  },
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
