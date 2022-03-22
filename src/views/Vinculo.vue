<template>
    <v-app>
        <div style="display: flex;justify-content: center;margin-bottom: 40px">
            <h2>Vinculação</h2>
        </div>
        <v-data-table :headers="headers" :items="items">
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
           text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
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
        text: "Nome Professor",
        align: "start",
        sortable: false,
        value: "nomeCompleto",
      },
      { text: "Mestrado", value: "mestrado" },
      { text: "Doutorado", value: "doutorado" },
    ],
       } 
    },
    computed:{
        allSelected () {
            return this.selected.length === this.items.length
        },
        categories () {
            const search = this.search.toLowerCase()
            if (!search) return this.items
                return this.items.filter(item => {
                    const text = item.fkPessoa.nomeCompleto.toLowerCase()
                    return text.indexOf(search) > -1
            })
        },     
        selections () {
            const selections = []
            for (const selection of this.selected) {
                selections.push(selection)
            }
            return selections
        },   

    },
    watch: {
        selected () {
            this.search = ''
        },
    },
    methods: {
        testa(i, selection){
            this.dialogExcluir = true
            this.pessoaExcluir = selection
            this.posicaoExcluir = i
            console.log(i)
            console.log(selection)
        },
        confirmarSucesso(){
            VinculoService.verifExist(this.pessoaExcluir.fkPessoa.idPessoa).then((res)=>{
                console.log(res.data)
                if(res.data){
                    this.dialogExcluir = false
                    this.selected.splice(this.posicaoExcluir,1)
                    VinculoService.excluir(this.pessoaExcluir.fkPessoa.idPessoa).then(()=>{
                        if(!this.items.includes(this.pessoaExcluir)){
                            this.items.push(this.pessoaExcluir)
                        }
                    })
                }else{
                    this.dialogExcluir = false
                    this.selected.splice(this.posicaoExcluir,1)
                    if(!this.items.includes(this.pessoaExcluir)){
                        this.items.push(this.pessoaExcluir)
                    }
                }
            })
            
            
        },
        cancelar(){
            this.dialogExcluir = false
            this.pessoaExcluir = null
            this.posicaoExcluir = null
        },
        testandoSave(){
            console.log(this.selected)
            console.log(this.items)
            if(this.model==0){
                this.vinculo = 1
            }else{
                this.vinculo = 2
            }
            VinculoService.verificarLista(this.selected,this.vinculo).then((res)=>{
                console.log(res)
            })
        },
        teste(){
            if(this.model==0){
                this.vinculo = 1
            }else{
                this.vinculo = 2
            }
            VinculoService.findSpecific(this.vinculo).then((res)=>{
                console.log(res.data)
                this.items = res.data
            })
            VinculoService.findByVinculo(this.vinculo).then((res)=>{
                this.selected = res.data
            })
        },
      next () {
        this.loading = true
        setTimeout(() => {
          this.search = ''
          this.selected = []
          this.loading = false
        }, 2000)
      },
    },
    beforeMount(){
        ManutencaoService.findAll().then((res)=>{
            console.log(res.data)
            this.items = res.data
        })
        // VinculoService.findSpecific(this.vinculo).then((res)=>{
        //     console.log(res)
        //     this.items = res.data
        // })

        // VinculoService.findByVinculo(this.vinculo).then((res)=>{
        //     this.selected = res.data
        // })
        
        
    }
}
</script>

<style lang="scss">

</style>