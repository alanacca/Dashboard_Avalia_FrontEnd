<template>
    <div>
        <v-app>
            <v-row style="display: flex; justify-content: center;margin-top: 120px; margin-bottom: 60px">
                <v-col cols="12" md="6">
                    <v-img
                        style="margin: auto"
                        max-height="150"
                        max-width="290"
                        src="@/assets/DashBoard__1 (1).png"
                    ></v-img>
                    <v-row >
                        <v-autocomplete
                            label="Digite o nome"
                            :items="items"
                            item-text="nomeCompleto"
                            return-object
                            style="margin-top: 40px"
                            v-model="pessoaPesquisa"
                        ></v-autocomplete>
                        <v-btn color="primary" style="margin-top: 40px" @click="pesquisar()">
                            <v-icon>fa-search</v-icon>
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-app>

    </div>
</template>

<script>
import * as HomePageService from '@/services/HomePageService.js'
import * as ManutencaoService from '@/services/ManutencaoService.js'
    export default {
        data: () => ({
            pessoaPesquisa: null,
            items: []
        }),
        methods:{
            nada(){
                console.log("Pesquisar")
                console.log(this.pessoaPesquisa)
            },
            pesquisar(){
                HomePageService.pesquisar(this.pessoaPesquisa.idPessoa).then((res)=>{
                    console.log(res)
                })
            }
        },
        beforeMount(){
            ManutencaoService.findAll().then((res)=>{
                this.items = res.data
                console.log(this.items)
            })
        }
  }

</script>

<style>
    
</style>
