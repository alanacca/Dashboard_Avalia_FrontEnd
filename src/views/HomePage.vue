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
                        <v-text-field
                            label="Digite o nome"
                            style="margin-top: 40px"
                            v-model="nomePesquisa"
                        ></v-text-field>
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
import * as HomePageService from '@/services/HomePage.js'
    export default {
        data: () => ({
            nomePesquisa: null,
        }),
        methods:{
            nada(){
                console.log("teste")
            },
            pesquisar(){
                HomePageService.pesquisar(this.nomePesquisa).then((res)=>{
                    console.log(res.data)
                })
            }
        }
  }

</script>

<style>
    
</style>
