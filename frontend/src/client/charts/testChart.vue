<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <bar-chart :chart-data="datacollection"></bar-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  import BarChart from './BarChart.js'

  export default {
    components: {
      LineChart,
      BarChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['Segunda', 'Terça', 'Quarta', 'Quinta'],
          datasets: [
            {
              backgroundColor: ['#f87979', '#fff', '#000'],
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
  }
</style>