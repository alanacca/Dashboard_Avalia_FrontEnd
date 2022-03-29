<template>
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
          <div v-if="mostrarTabela==true">
            <v-data-table
                
                :headers="headers"
                :items="items"
                :items-per-page="5"
            ></v-data-table>
            <h2 style="justify-content: center; display: flex; align-items: center; margin-top: 20px">Calculo Geral dos Anos ({{anoInicio}} - {{anoFinal}})</h2>
            <v-data-table
                :headers="titulo"
                :items="ppgcc"
                :items-per-page="5"
            ></v-data-table>
          </div>
        </v-list>
</template>

<script>

import * as CalculoService from '../services/CalculoService'

  export default {
    props:{
        value: Object
    },
    data () {
      return {
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
        CalculoService.calculoIndices(this.anoInicio,this.anoFinal).then((res)=>{
          this.items = res.data
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