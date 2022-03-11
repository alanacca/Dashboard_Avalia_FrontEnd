<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import * as DashBoardService from '../services/DashBoardService'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      qtd:{
        artigoEventos: null,
        capitulos: null,
        periodicos: null,
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      DashBoardService.countProducoes(3097665029936012).then((res)=>{
        this.qtd.capitulos = res.data.Capitulo
        this.qtd.artigoEventos = res.data.Artigo_Eventos
        this.qtd.periodicos= res.data.Periodico
        this.initChart()
      })
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Períodicos', 'Artigo em Eventos', 'Capitulos de Livros']
        },
        series: [
          {
            name: 'Produções',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: this.qtd.periodicos, name: 'Períodicos' },
              { value: this.qtd.artigoEventos, name: 'Artigo em Eventos' },
              { value: this.qtd.capitulos, name: 'Capitulos de Livros' },
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  },
}
</script>
