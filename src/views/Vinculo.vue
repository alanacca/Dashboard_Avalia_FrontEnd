<template>
    <v-app>
        <div style="display: flex;justify-content: center;margin-bottom: 40px">
            <h2>Vinculação</h2>
        </div>
        <v-data-table :headers="headers" :items="items" class="item-table">
            <template v-slot:[`item.mestrado`]="{ item }">
                <v-simple-checkbox v-model="item.mestrado" :ripple="false"></v-simple-checkbox>
            </template>
            <template v-slot:[`item.doutorado`]="{ item }">
                <v-simple-checkbox v-model="item.doutorado" :ripple="false"></v-simple-checkbox>
            </template>
            </v-data-table>
            <v-card-actions style="justify-content: center;align-items: center;display:grid;margin-bottom: 10px">
                <v-btn color="primary" @click="testandoSave()">
                    Salvar
                </v-btn>
            </v-card-actions>
    </v-app>
</template>

<script>

import * as VinculoService from '../services/VinculoService'
import * as ManutencaoService from '../services/ManutencaoService'

export default {
    data() {
       return {
           page: 1,
            pageCount: 0,
            itemsPerPage: 10,
           dialogExcluir: false,
           model: '1',
           vinculo: 1,
           items: [],
           selec: [],
      loading: false,
      search: '',
      pessoaExcluir: null,
      posicaoExcluir: null,
      selected: [],
      coiso: [],
      existePessoa: false,
      mestrado: false,
      doutorado: false,
      headers: [
      {
        text: "NOME PROFESSOR",
        align: "start",
        sortable: false,
        value: "nomeCompleto",
      },
      { text: "MESTRADO", value: "mestrado" },
      { text: "DOUTORADO", value: "doutorado" },
    ],
       } 
    },
    // computed:{
    //     allSelected () {
    //         return this.selected.length === this.items.length
    //     },
    //     categories () {
    //         const search = this.search.toLowerCase()
    //         if (!search) return this.items
    //             return this.items.filter(item => {
    //                 const text = item.fkPessoa.nomeCompleto.toLowerCase()
    //                 return text.indexOf(search) > -1
    //         })
    //     },     
    //     selections () {
    //         const selections = []
    //         for (const selection of this.selected) {
    //             selections.push(selection)
    //         }
    //         return selections
    //     },   

    // },
    // watch: {
    //     selected () {
    //         this.search = ''
    //     },
    // },
    methods: {
        testandoSave(){
            console.log(this.items)
            VinculoService.atualizarLista(this.items).then((res)=>{
                console.log(res.data)
            })
        },
    },
    beforeMount(){
        ManutencaoService.findAll().then((res)=>{
            console.log(res.data)
            this.items = res.data
        })
        
        
    }
}
</script>

<style scope lang="scss">

.v-data-table>.v-data-table__wrapper>table>tbody>tr>td {

    font-size: 20px !important
}

.v-data-table>.v-data-table__wrapper>table>thead>tr>th {
    font-size: 15px !important;
}


</style>