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
                            item-text="nome_Completo"
                            return-object
                            style="margin-top: 40px"
                            v-model="currentPesquisa"
                        ></v-autocomplete>
                        <v-btn color="primary" style="margin-top: 40px" @click="nada()">
                            <v-icon>fa-search</v-icon>
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-app>

    </div>
</template>

<script>
import * as HomePageService from '@/services/HomePage.js'
import * as ManutencaoService from '@/services/ManutencaoService.js'
    export default {
        data: () => ({
            currentPesquisa: null,
            items: []
        }),
        methods:{
            nada(){
                console.log("Pesquisar")
                console.log(this.currentPesquisa)
            },
            pesquisar(){
                HomePageService.pesquisar(this.nomePesquisa).then((res)=>{
                    console.log(res.data)
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
