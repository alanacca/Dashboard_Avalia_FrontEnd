<template>
        <v-list three-line>
            <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="5"
                class="elevation-1"
            ></v-data-table>
        </v-list>
</template>

<script>

import * as MestradoService from '../services/MestradoService'
import * as CalculoService from '../services/CalculoService'

  export default {
    props:{
        value: Object
    },
    data () {
      return {
        headers: [
          {
            text: 'Nome do Professor',
            align: 'start',
            sortable: true,
            value: 'nomeCompleto',
          },
          { text: 'nxRestrito', value: 'NxRestrito' },
          { text: 'nxGeral', value: 'NxGeral' },
          { text: 'iRestrito', value: 'iRestrito' },
          { text: 'iGeral', value: 'iGeral' },
        ],
        items: [],
        profMestrado: [],
        selected: null
      }
    },
    methods:{
        teste(){
            console.log(this.selected)
        }
    },
    beforeMount(){
        MestradoService.getMestrado().then((res)=>{
            this.profMestrado = res.data
            console.log(this.profMestrado)
        })
        CalculoService.calculoIndices(2018,2019).then((res)=>{
          this.items = res.data
        })
        
    }
  }
</script>