<template>
        <!-- <v-app> -->
            <v-row style="display: flex;justify-content: center;align-items:center">
                <v-col cols="12" md="6">
                    <v-row>
                        <v-img style="margin: auto;justify-content: center;display: grid;align-items: center"
                                max-height="350"
                                max-width="200"
                                src="@/assets/ufma_logo.png"
                            ></v-img>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-img class="resize" 
                            style="margin: auto;justify-content: center;display: grid;align-items: center"
                                src="@/assets/ppgcc_logo.png"
                            ></v-img>
                        </v-col>
                        <v-col>
                            <v-img class="resize"
                            style="margin: auto;justify-content: center;display: grid;align-items: center"
                                src="@/assets/DCCMApi_logo.png"
                            ></v-img>
                        </v-col>
                    </v-row>
                    <v-row style="justify-content: center; display: flex;">
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
                                    v-model="platIdPesquisa"
                                    ></v-autocomplete>
                        </v-col>
                                    
                    </v-row>
                    <v-row style="justify-content: center; display: flex;">
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
        <!-- </v-app> -->
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
                console.log(this.pessoaPesquisa)
                if(this.pessoaPesquisa!=null && this.platIdPesquisa!=null){
                    this.loading = true
                    // console.log(this.pessoaPesquisa.idPessoa)
                    HomePageService.pesquisar(this.pessoaPesquisa.idPessoa, this.platIdPesquisa)
                    .then((res)=>{
                        console.log(res.data)
                        this.loading = false
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
                console.log(this.cadastrados)
            })

            ManutencaoService.findAllPlats().then((res)=>{
                this.items = res.data
            })
        }
  }

</script>

<style>

.resize{
    width: 200px;
    height: 90px;
}
</style>
