<template>
    <div>
        <v-app>
            <v-row style="display: flex; justify-content: center;margin-top: 120px; margin-bottom: 60px">
                <v-col cols="12" md="6">
                    <v-row>
                        <v-img
                            style="margin: auto;justify-content: center;display: grid;align-items: center"
                            max-height="150"
                            max-width="290"
                            src="@/assets/DashBoard__1 (1).png"
                        ></v-img>
                    </v-row>
                    <v-row style="justify-content: center; display: flex;margin-top:40px">
                                <v-autocomplete
                                    label="Digite o nome"
                                    :items="cadastrados"
                                    item-text="nomeCompleto"
                                    return-object
                                    v-model="pessoaPesquisa"
                                ></v-autocomplete>

                                    <v-autocomplete
                                    :items="items"
                                    label="Plataforma"
                                    item-text="descricao"
                                    item-value="id"
                                    style="margin-left: 10px;"
                                    v-model="platIdPesquisa"
                                    ></v-autocomplete>
                    </v-row>
                    <v-row style="justify-content: center; display: flex">
                            <v-btn color="primary" @click="pesquisar()">
                                Importar
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
            items: [],
            pessoaPesquisa: null,
            platIdPesquisa: null,
            cadastrados: []
        }),
        methods:{
            nada(){
                console.log("Pesquisar")
                console.log(this.pessoaPesquisa)
            },
            pesquisar(){
                console.log(this.pessoaPesquisa)
                console.log(this.platIdPesquisa)
                HomePageService.pesquisar(this.pessoaPesquisa.idPessoa, this.platIdPesquisa).then((res)=>{
                    console.log(res)
                })
            }
        },
        beforeMount(){
            ManutencaoService.findAll().then((res)=>{
                this.cadastrados = res.data
                console.log(this.cadastrados)
            })

            ManutencaoService.findAllPlats().then((res)=>{
                this.items = res.data
            })
        }
  }

</script>

<style>
    
</style>
