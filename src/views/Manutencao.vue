<template>
    <v-app>
        <div style="display: flex;justify-content: center;margin-bottom: 40px">
            <h2>Manutenção</h2>
        </div>
        <v-form lazy-validation ref="form">
            <v-row style="justify-content: center">
                <v-col
                    style="margin: 10px"
                    cols="12"
                    md="3"
                >
                 <v-text-field
                        v-model="plataformapessoa.idPlataforma"
                        label="Id Plataforma"
                        solo
                        dense
                        required
                    ></v-text-field>
                </v-col>
                <v-col
                    style="margin: 10px"
                    cols="12"
                    md="3"
                >
                <v-text-field
                        v-model="plataformapessoa.fkPessoa.nomeCompleto"
                        label="Nome Completo"
                        solo
                        dense
                        required
                    ></v-text-field>
                   
                </v-col>
                <v-col
                    style="margin: 10px"
                    cols="6"
                    md="2"
                >
                    <v-select
                        :items="items"
                        label="Plataforma"
                        item-text="descricao"
                        item-value="id"
                        v-model="plataformapessoa.fkPlataforma"
                        solo
                        dense
                        required
                    ></v-select>
                </v-col>
            </v-row>
        </v-form>
        <v-card-actions>
            <v-row  justify="center" no-gutters>
              <v-col align="center">
                <v-btn
                @click="salvar()"
                color="primary"
                style="border-radius: 8px"
                dark
                :disabled="isDisabled"
                >
                    Salvar
                </v-btn>
              </v-col>
            </v-row>
        </v-card-actions>
        <v-dialog
                v-model="dialogSucesso"
                max-width="290"
            >
    
        <v-card>
            <v-card-title class="text-h5">
            Sucesso
            </v-card-title>
            <v-card-text>Pessoa Salva com Sucesso</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="confirmarSucesso"
            >
                Ok
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <v-dialog
                v-model="dialogErro"
                max-width="290"
                persistent
            >
    
        <v-card>
            <v-card-title class="text-h5">
            Erro
            </v-card-title>
            <v-card-text>Essa pessoa já está cadastrada</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="confirmar"
            >
                Ok
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import * as ManutencaoService from "@/services/ManutencaoService.js"
    export default{
        data:()=>{
            return {
                dialogErro: false,
                dialogSucesso: false,
                items: [],
                plataformapessoa: {
                    id: null,
                    fkPessoa: {id: null, nomeCompleto: null},
                    fkPlataforma: null,
                    idPlataforma: null
                }
            }
        },
        computed:{
            isDisabled(){
               return this.$refs.form;
            }
        },
        methods:{
            isDisabled2(){
               return this.$refs.form.validate();
            },
            salvar(){
                console.log(this.plataformapessoa)
                if(this.$refs.form.validate()){
                    // console.log(this.pessoa)
                    ManutencaoService.salvar(this.plataformapessoa).then((res)=>{
                        console.log(res)
                        this.dialogSucesso = true
                    }).catch((error)=>{
                        console.log(error)
                    })
                }
                    
            },
            addElements(){
                this.items.push
            },
            verificarExistencia(){
                if(this.pessoa.idPlataforma){

                    ManutencaoService.existsByIdPlataforma(this.pessoa.idPlataforma).then((res)=>{
                        if(res.data){
                            this.dialogErro = true
                        }
                    }).catch(()=>{
                        this.dialogErro = false
                    })
                }
                if(this.pessoa.Nome_Completo){
                    ManutencaoService.existsbyNomeCompleto(this.pessoa.Nome_Completo).then((res)=>{
                        if(res.data){
                            this.dialogErro = true
                        }
                    }).catch(()=>{
                        this.dialogErro = false
                    })
                }
            },
            confirmar(){
                this.dialogErro = false
                this.plataformapessoa.idPlataforma = null
                this.plataformapessoa.fkPessoa.nomeCompleto = null
            },
            confirmarSucesso(){
                this.dialogSucesso = false
                this.plataformapessoa.idPlataforma = null
                this.plataformapessoa.fkPessoa.nomeCompleto = null
                this.plataformapessoa.fkPlataforma = null
            },
            nada(){
                console.log("teste")
            }
        },
        beforeMount(){
            ManutencaoService.findAllPlats().then((res)=>{
                this.items = res.data
            })
        }
    }
</script>

<style>

</style>
