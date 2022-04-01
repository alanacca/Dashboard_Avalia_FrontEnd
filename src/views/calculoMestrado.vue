<template>
  <v-app>
    <v-list three-line>
      <h2 style="justify-content: center; display: flex; align-items: center; margin-bottom: 20px">Calculo de Indices do Mestrado</h2>
      <div>
        <v-row style="justify-content: center; display: flex; align-items: center">
          <v-col cols="12" md="2">
            <v-select
              :items="years"
              label="Ano Inicio"
              v-model="anoInicio"
              @change="mostrarTabela = false"
            ></v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              :items="years"
              label="Ano Final"
              v-model="anoFinal"
              @change="mostrarTabela = false"
            ></v-select>
          </v-col>
          <v-col cols="12" md="1">
            <v-btn color="primary"
              @click="calcularIndices()"
              :disabled="habilitar"
            > Calcular</v-btn>
          </v-col>
        </v-row>
      </div>
      <div v-if="mostrarTabela==true" style="margin: 20px">
        <v-tabs
          v-model="model"
          centered
          slider-color="yellow"
        >

          <v-tab :key="1" :href="`#tab-1`">Tabelas</v-tab>
          <v-tab :key="2" :href="`#tab-2`">Gráficos</v-tab>

        </v-tabs>
        <v-tabs-items v-model="model">
          <v-tab-item :key="1" :value="`tab-1`">
            <v-card>
              <h3 style="justify-content: center; display: flex; align-items: center; margin-top: 20px">Calculo de Indices dos Professores</h3>
              <v-data-table
                :headers="headers"
                :items="items"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                @page-count="pageCount = $event"
                  
              ></v-data-table>
              <div class="text-center pt-2">
                <v-pagination
                  v-model="page"
                  :length="pageCount"
                ></v-pagination>
              </div>
            </v-card>
            <v-card>
              <h3 style="color: dark;justify-content: center; display: flex; align-items: center; margin-top: 20px">Calculo de Indices do PPGCC dos Anos ({{anoInicio}} - {{anoFinal}})</h3>
              <v-data-table
                :headers="titulo"
                :items="ppgcc"
                :items-per-page="5"
                hide-default-footer
                class="elevation-3"
              ></v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item :key="2" :value="`tab-2`">
              <div style="display: block">
                <mdb-bar-chart :data="barChartData" :options="barChartOptions" :height="500"/>
              </div>
          </v-tab-item>
        </v-tabs-items>
      </div>

        
    </v-list>
  </v-app>
</template>

<script>
// import * as MestradoService from '../services/MestradoService'
import * as CalculoService from '../services/CalculoService'
import {mdbBarChart} from 'mdbvue'

  export default {
    props:{
        value: Object
    },
    components:{
      mdbBarChart,
    },
    data () {
      return {
        barChartData: {
        labels: [],
        datasets: [
          {
            label: 'iRegistro',
            data: [20],
            backgroundColor: 'rgba(245, 74, 85, 0.5)',
            borderWidth: 1
          }, {
            label: 'iNao Resgistro',
            data: [],
            backgroundColor: 'rgba(90, 173, 246, 0.5)',
            borderWidth: 1
          }, {
            label: 'iGeral',
            data: [],
            backgroundColor: 'rgba(245, 192, 50, 0.5)',
            borderWidth: 1
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            barPercentage: 1,
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },






        page: 1,
        pageCount: 0,
        itemsPerPage: 5,
        model: 'tab-1',
        disabled: true,
        headers: [
          {
            text: 'Nome do Professor',
            align: 'start',
            sortable: true,
            value: 'nomeCompleto',
          },
          { text: 'iRestrito', 
            value: 'iRestrito',
            align: 'start',
            sortable: false,
          
          },
          { text: 'iNao Restrito', value: 'iNao_Restrito' },
          { text: 'iGeral', value: 'iGeral' },
        ],
        titulo: [
          { text: 'iRestrito', value: 'iRestrito_PPGCC' },
          { text: 'iNao Restrito', value: 'iNao_Restrito_PPGCC' },
          { text: 'iGeral', value: 'iGeral_PPGCC' },
        ],
        ppgcc: [],
        items: [],
        mostrarTabela: false,
        anoInicio: null,
        anoFinal: null,
        profMestrado: [],
        selected: null
      }
    },
    computed : {
      years () {
        const year = new Date().getFullYear()
        return Array.from({length: year - 2000}, (value, index) => 2001 + index)
      },
      habilitar: function(){
        if(this.anoInicio != null && this.anoFinal != null){
          return false
        }else{
          return true
        }
      }
    },
    methods:{
      calcularIndices(){
        this.barChartData.labels = []
        this.barChartData.datasets[0].data = []
        this.barChartData.datasets[1].data = []
        this.barChartData.datasets[2].data = []
        CalculoService.calculoIndices(this.anoInicio,this.anoFinal).then((res)=>{
          this.items = res.data
          this.items.forEach(element =>{
            this.barChartData.labels.push(element.nomeCompleto)
            this.barChartData.datasets[0].data.push(parseFloat(element.iRestrito.replace(",",".")))
            // console.log(element.iRestrito)
            this.barChartData.datasets[1].data.push(parseFloat(element.iNao_Restrito.replace(",",".")))
            this.barChartData.datasets[2].data.push(parseFloat(element.iGeral.replace(",",".")))
            // console.log(this.barChartData)
          })
          this.mostrarTabela = true
        })
        CalculoService.calculoIndicesPPGCC(this.anoInicio,this.anoFinal).then((res)=>{
          this.ppgcc = res.data
          console.log(res.data)
        })
      },
        teste(){
            console.log(this.selected)
        }
    },
  }
</script>