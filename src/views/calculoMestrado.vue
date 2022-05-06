<template>
  <v-app>
    <v-list three-line>
      <h2 style="justify-content: center; display: flex; align-items: center; margin-bottom: 20px">Calculo de Indices do Mestrado</h2>
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
            <!-- <v-card>
              <h3 v-tooltip="'Calculo dos indices individuais 2 Forma dos professores do programa de mestrado da UFMA'" 
              style="justify-content: center; display: flex; align-items: center; margin-top: 20px">
              Calculo de Indices dos Professores 2 Forma</h3>
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
            </v-card> -->
            <v-card>
              <h3 v-tooltip="'Calculo Individual de Indices CAPES dos Professores do Mestrado'" 
              style="justify-content: center; display: flex; align-items: center; margin-top: 20px">
              Calculo Individual de Indices CAPES dos Professores nos Anos ({{anoInicio}} - {{anoFinal}})</h3>
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
              <h3 v-tooltip="'Calculo dos Indices CAPES do Programa de Mestrado da UFMA'" style="justify-content: center; display: flex; align-items: center; margin-top: 20px">Calculo Geral dos Indices CAPES do PPGCC nos Anos ({{anoInicio}} - {{anoFinal}})</h3>
              <v-data-table
                
                :headers="titulo"
                :items="ppgcc"
                :items-per-page="5"
                hide-default-footer
                class="elevation-4"
              ></v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item :key="2" :value="`tab-2`">
            <!-- <div style="display: block">
                <h3 v-tooltip="'Calculo dos indices individuais 2 Forma dos professores do programa de mestrado da UFMA'" style="justify-content: center; display: flex; align-items: center; margin-top: 20px">Calculo de Indices dos Professores 2 Forma</h3>
                <mdb-bar-chart :data="barChartData2Forma" :options="barChartOptions2Forma" :height="500"/>
              </div> -->
              <div style="display: block">
                <h3 v-tooltip="'Calculo dos indices individuais dos professores do programa de mestrado da UFMA'" style="justify-content: center; display: flex; align-items: center; margin-top: 20px">Calculo de Indices dos Professores</h3>
                <mdb-bar-chart :data="barChartData" :options="barChartOptions" :height="500"/>
              </div>
              <div style="display: block">
                <h3 v-tooltip="'Calculo dos indices do programa de mestrado da UFMA'" style="justify-content: center; display: flex; align-items: center; margin-top: 20px">Calculo de Indices do PPGCC dos Anos ({{anoInicio}} - {{anoFinal}})</h3>
                <mdb-bar-chart :data="mestradoData" :options="mestradoOptions" :height="500"/>
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

      barChartData2Forma: {
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
      barChartOptions2Forma: {
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

      mestradoData: {
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
      mestradoOptions: {
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
          { text: 'iRestrito(Não Repetido)', 
            value: 'iRestrito_2_forma',
            align: 'start',
            sortable: false,
          
          },
          { text: 'iNao Restrito(Não Repetido)', value: 'iNao_Restrito_2_forma' },
          { text: 'iGeral(Não Repetido)', value: 'iGeral_2_forma' },
        ],
        titulo: [
          { text: 'iRestrito', value: 'iRestrito_PPGCC' },
          { text: 'iNao Restrito', value: 'iNao_Restrito_PPGCC' },
          { text: 'iGeral', value: 'iGeral_PPGCC' },
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
        this.limparCampos();
        // CalculoService.calculoIndicesMestrado2Forma(this.anoInicio,this.anoFinal).then((res)=>{
        //   this.items2Forma = res.data
        //   this.items2Forma.forEach(element =>{
        //     this.barChartData2Forma.labels.push(element.nomeCompleto)
        //   this.barChartData2Forma.datasets[0].data.push(parseFloat(element.iRestrito.replace(",",".")))
        //     // console.log(element.iRestrito)
        //     this.barChartData2Forma.datasets[1].data.push(parseFloat(element.iNao_Restrito.replace(",",".")))
        //     this.barChartData2Forma.datasets[2].data.push(parseFloat(element.iGeral.replace(",",".")))
        //   })
        // })
        CalculoService.calculoIndices(this.anoInicio,this.anoFinal).then((res)=>{
          console.log(res.data)
          this.items = res.data
          // this.items.forEach(element =>{
          //   this.barChartData.labels.push(element.nomeCompleto)
          //   this.barChartData.datasets[0].data.push(parseFloat(element.iRestrito.replace(",",".")))
          //   // console.log(element.iRestrito)
          //   this.barChartData.datasets[1].data.push(parseFloat(element.iNao_Restrito.replace(",",".")))
          //   this.barChartData.datasets[2].data.push(parseFloat(element.iGeral.replace(",",".")))
          //   // console.log(this.barChartData)
          // })
          this.mostrarTabela = true
        })
        CalculoService.calculoIndicesPPGCC(this.anoInicio,this.anoFinal).then((res)=>{
          this.ppgcc = res.data
          this.mestradoData.datasets[0].data.push(parseFloat(res.data[0].iRestrito_PPGCC.replace(",",".")))
          this.mestradoData.datasets[1].data.push(parseFloat(res.data[0].iNao_Restrito_PPGCC.replace(",",".")))
          this.mestradoData.datasets[2].data.push(parseFloat(res.data[0].iGeral_PPGCC.replace(",",".")))
          // console.log(res.data[0].iGeral_PPGCC)
        })
      },
      limparCampos(){
        this.barChartData.labels = []
        this.barChartData.datasets[0].data = []
        this.barChartData.datasets[1].data = []
        this.barChartData.datasets[2].data = []
        this.mestradoData.labels = []
        this.mestradoData.datasets[0].data = []
        this.mestradoData.datasets[1].data = []
        this.mestradoData.datasets[2].data = []
      },
        teste(){
            console.log(this.selected)
        }
    },
  }
</script>
