<template>
        <v-app>
            <v-row style="display: flex; justify-content: center;margin-top: 120px; margin-bottom: 60px">
                <v-col cols="12" md="6">
                    <v-row>
                        <v-img style="margin: auto;justify-content: center;display: grid;align-items: center"
                            max-height="350"
                            max-width="350"
                            src="@/assets/logo_5.png"
                        ></v-img>
                    </v-row>
                    <v-row style="justify-content: center; display: flex;margin-top:40px">
                        <v-col cols="12" md="6">
                                <v-autocomplete
                                    label="Digite o nome"
                                    :items="cadastrados"
                                    item-text="nomeCompleto"
                                    return-object
                                    solo
                                    v-model="pessoaPesquisa"
                                ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="6">
                                    <v-autocomplete
                                    :items="items"
                                    label="Plataforma"
                                    item-text="descricao"
                                    item-value="id"
                                    solo
                                    style="margin-left: 10px;"
                                    v-model="platIdPesquisa"
                                    ></v-autocomplete>
                        </v-col>
                                    
                    </v-row>
                    <v-row style="justify-content: center; display: flex; marign-right=5px">
                            <v-btn color="primary" @click="pesquisar()">
                                Importar
                            </v-btn>
                            <v-progress-circular
                                v-if="loading"
                                indeterminate
                                color="primary"
                            ></v-progress-circular>
                    </v-row>
                </v-col>
            </v-row>
        </v-app>
</template>

<script>
import * as HomePageService from '@/services/HomePageService.js'
import * as ManutencaoService from '@/services/ManutencaoService.js'
    export default {
        data: () => ({
            items: [],
            loading: false,
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
                if(this.pessoaPesquisa!=null && this.platIdPesquisa!=null){
                    this.loading = true
                    console.log(this.pessoaPesquisa.idPessoa)
                    HomePageService.pesquisar(this.pessoaPesquisa.idPessoa, this.platIdPesquisa)
                    .then((res)=>{
                        console.log(this.pessoaPesquisa.idPessoa)
                        this.loading = false
                        console.log(res.data)
                        if(res.data.fkPlataforma.sigla=="L"){
                            this.$router.push("/dashboard/"+res.data.idPlataforma+"/"+res.data.fkPlataforma.descricao)
                        }
                    })
                }else{
                    alert("É necessário preencher os campos")
                }
            }
        },
        beforeMount(){
            ManutencaoService.findAll().then((res)=>{
                this.cadastrados = res.data
                // console.log(this.cadastrados)
            })

            ManutencaoService.findAllPlats().then((res)=>{
                this.items = res.data
            })
        }
  }

</script>

<style>

</style>
