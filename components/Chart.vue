<template>
    <div class="chart" :style="style">
        <canvas ref="myChart"></canvas>
    </div>
</template>

<script>
    const Chart = require('chart.js');
    export default {
        name: "Chart",
        props: {
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '250px'
            },
            type: {
                type: String,
                default: 'bar'
            },
            data: {
                type: Array,
                default: () => {
                    return []
                }
            },
            label: {
                type: String,
                default: null
            }
        },
        computed: {
            style() {
                return {
                    width: this.width,
                    height: this.height
                }
            }
        },
        methods: {
          createChart() {
              const ctx = this.$refs.myChart.getContext('2d');
              Chart.defaults.global.defaultColor = '#333333';
              Chart.defaults.global.defaultFontColor = '#333333';
              Chart.defaults.global.defaultFontSize = 16;
              new Chart(ctx, {
                  type: this.type,
                  data: {
                      labels: this.data.map(x => x.label),
                      datasets: [{
                          label: this.label,
                          data: this.data.map(x => x.count),
                          borderWidth: 0
                      }]
                  },
                  options: {
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                          xAxes: [{
                              type: 'time',
                              time: {
                                  displayFormats: {
                                      quarter: 'MMM YYYY'
                                  }
                              }
                          }]
                      }
                  }
              });
          }
        },
        mounted() {
            this.createChart()
        },
        watch: {
            data() {
                this.createChart()
            }
        }
    }
</script>

<style scoped>

</style>
