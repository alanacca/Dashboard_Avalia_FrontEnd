<template>
    <v-app>
        <div style="display: flex;justify-content: center;margin-bottom: 40px">
            <h2>Vinculação</h2>
        </div>
        <template>
            <v-card>
                <v-tabs
                    v-model="model"
                    centered
                    slider-color="black"
                    @change="teste()"
                >
                <v-tab>Mestrado</v-tab>
                <v-tab>Doutorado</v-tab>
                <v-tab-item
                    v-for="i in 2"
                    :key="i"
                >
                    <v-container fluid>
                        <!-- <v-row
                                        align="center"
                                        justify="start"
                                    >
                                        <v-col
                                            v-for="item in items"
                                            :key="item.fkPessoa.id"
                                        >
                                            <v-chip
                                                close
                                                @click:close="testa()"
                                            >
                                                {{item.fkPessoa.nomeCompleto}}
                                            </v-chip>
                                        </v-col>
                        </v-row> -->
                    <v-row
                                        align="center"
                                        justify="start"
                                    >
                                        <v-col
                                            v-for="(selection, i) in selections"
                                            :key="selection.fkPessoa.nomeCompleto"
                                            class="shrink"
                                        >
                                            <v-chip
                                                :disabled="loading"
                                                close
                                                @click:close="testa(i,selection)"
                                            >
                                            <v-icon
                                                left
                                                v-text="selection.icon"
                                                ></v-icon>
                                                {{ selection.fkPessoa.nomeCompleto }}
                                            </v-chip>
                                        </v-col>
                                    </v-row>
                                    <v-divider v-if="!allSelected"></v-divider>

                                    <v-list>
                                        <template v-for="item in categories">
                                            <v-list-item
                                            v-if="!selected.includes(item)"
                                            :key="item.fkPessoa.nomeCompleto"
                                            :disabled="loading"
                                            @click="selected.push(item)"
                                            >
                                                <v-list-item-avatar>
                                                    <v-icon
                                                    :disabled="loading"
                                                    v-text="item.icon"
                                                    ></v-icon> 
                                                </v-list-item-avatar>
                                                <v-list-item-title v-text="item.fkPessoa.nomeCompleto"></v-list-item-title>
                                            </v-list-item>
                                        </template>
                                    </v-list>
                    </v-container> 
                </v-tab-item>
                </v-tabs>
                <v-btn style="justify-items: center" @click="testandoSave()">
                    Salvar no Banco
                </v-btn>
            </v-card>
        </template>
    </v-app>
</template>

<script>

import * as VinculoService from '../services/VinculoService'

export default {
    data() {
       return {
           model: '1',
           text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
           vinculo: 1,
           items: [],
      loading: false,
      search: '',
      selected: [],
      coiso: [],
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
            console.log(i)
            console.log(selection)
            this.selected.splice(i,1)
            if(!this.items.includes(selection)){
                this.items.push(selection)
            }
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
        VinculoService.findSpecific(this.vinculo).then((res)=>{
            // console.log(res)
            this.items = res.data
        })

        VinculoService.findByVinculo(this.vinculo).then((res)=>{
            this.selected = res.data
        })
        
        
    }
}
</script>

<style lang="scss">

</style>