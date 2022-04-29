<template>
  <v-app>
    <v-list three-line>
      <h2 style="justify-content: center; display: flex; align-items: center; margin-bottom: 20px">Calculo de Indices do Doutorado</h2>
      <div>
        <v-row style="justify-content: center; display: flex; align-items: center">
          <v-col cols="12" md="2">
            <v-autocomplete
              :items="years"
              label="Ano Inicio"
              v-model="anoInicio"
              solo
              @change="mostrarTabela = false"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="2">
            <v-autocomplete
              :items="years"
              label="Ano Final"
              v-model="anoFinal"
              solo
              @change="mostrarTabela = false"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="1" style="margin-bottom: 30px">
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
              <h3 v-tooltip="'Calculo dos indices de forma individual 2 Forma dos professores do doutorado'" style="justify-content: center; display: flex; align-items: center; margin-top: 20px">Calculo de Indices dos Professores 2 Forma</h3>
              <v-data-table
                :headers="headers"
                :items="items2Forma"
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
              <h3 v-tooltip="'Calculo dos indices de forma individual dos professores do doutorado'" style="justify-content: center; display: flex; align-items: center; margin-top: 20px">Calculo de Indices dos Professores</h3>
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
              <h3 v-tooltip="'Calculo dos indices do programa de doutorado da UFMA'" style="color: dark;justify-content: center; display: flex; align-items: center; margin-top: 20px">
              Calculo de Indices do DCCMAPI dos Anos ({{anoInicio}} - {{anoFinal}})</h3>
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
                <h3 v-tooltip="'Calculo dos indices de forma individual dos professores do programa de doutorado da UFMA'" style="justify-content: center; display: flex; align-items: center; margin-top: 20px">Calculo de Indices dos Professores</h3>
                <mdb-bar-chart :data="barChartData" :options="barChartOptions" :height="500"/>
              </div>
              <div style="display: block">
                <h3 v-tooltip="'Calculo dos indices do programa de doutorado da UFMA'" style="color: dark;justify-content: center; display: flex; align-items: center; margin-top: 20px">Calculo de Indices do DCCMAPI dos Anos ({{anoInicio}} - {{anoFinal}})</h3>
                <mdb-bar-chart :data="doutoradoData" :options="doutoradoOptions" :height="500"/>
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
            data: [],
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

      doutoradoData: {
        labels: [],
        datasets: [
          {
            label: 'iRegistro',
            data: [],
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
      doutoradoOptions: {
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
          { text: 'iRestrito', value: 'iRestrito_DCC' },
          { text: 'iNao Restrito', value: 'iNao_Restrito_DCC' },
          { text: 'iGeral', value: 'iGeral_DCC' },
        ],
        ppgcc: [],
        items: [],
        items2Forma: [],
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
        CalculoService.calculoIndicesDoutorado2Forma(this.anoInicio,this.anoFinal).then(res =>{
          this.items2Forma = res.data
          // this.items2Forma.forEach(element =>{
          //   this.barChartData.labels.push(element.nomeCompleto)
          //   this.barChartData.datasets[0].data.push(parseFloat(element.iRestrito.replace(",",".")))
          //   // console.log(element.iRestrito)
          //   this.barChartData.datasets[1].data.push(parseFloat(element.iNao_Restrito.replace(",",".")))
          //   this.barChartData.datasets[2].data.push(parseFloat(element.iGeral.replace(",",".")))
          //   // console.log(this.barChartData)
          // })
        })
        
        CalculoService.calculoIndicesDoutorado(this.anoInicio,this.anoFinal).then((res)=>{
          this.items = res.data
          console.log(this.items)
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
        CalculoService.calculoIndicesDCC(this.anoInicio,this.anoFinal).then((res)=>{
          this.ppgcc = res.data
          this.doutoradoData.datasets[0].data.push(parseFloat(res.data[0].iRestrito_DCC.replace(",",".")))
          this.doutoradoData.datasets[1].data.push(parseFloat(res.data[0].iNao_Restrito_DCC.replace(",",".")))
          this.doutoradoData.datasets[2].data.push(parseFloat(res.data[0].iGeral_DCC.replace(",",".")))
          console.log(res.data)
        })
      },

      limparDados(){
        this.barChartData.labels = []
        this.barChartData.datasets[0].data = []
        this.barChartData.datasets[1].data = []
        this.barChartData.datasets[2].data = []
        this.doutoradoData.labels = []
        this.doutoradoData.datasets[0].data = []
        this.doutoradoData.datasets[1].data = []
        this.doutoradoData.datasets[2].data = []
      },
        teste(){
            console.log(this.selected)
        }
    },
  }
</script>

<style lang="sass">
  
</style>