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
                        v-model="pessoa.idPlataforma"
                        label="Id Plataforma"
                        solo
                        dense
                        @change="verificarExistencia()"
                        required
                    ></v-text-field>
                </v-col>
                <v-col
                    style="margin: 10px"
                    cols="12"
                    md="3"
                >
                <v-text-field
                        v-model="pessoa.Nome_Completo"
                        label="Nome Completo"
                        solo
                        dense
                        @change="verificarExistencia()"
                        required
                    ></v-text-field>
                   
                </v-col>
                <v-col
                    style="margin: 10px"
                    cols="6"
                    md="2"
                >
                    <v-select
                        :items=items
                        label="Plataforma"
                        item-text="nome"
                        item-value="id"
                        v-model="pessoa.Plataforma"
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
                v-model="dialogErro"
                max-width="290"
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
                items: [{nome: "Lattes", id: "L"},{nome: "Scholar", id: "S"},{nome:"OCID",id:"O"}],
                pessoa: {
                    idPessoa: null,
                    Nome_Completo: null,
                    idPlataforma: null,
                    Plataforma: null,
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
                if(this.$refs.form.validate()){
                    // console.log(this.pessoa)
                    ManutencaoService.salvar(this.pessoa).then((res)=>{
                        console.log(res.data);
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

                    console.log("teste nome completo")
                    ManutencaoService.existsByIdPlataforma(this.pessoa.idPlataforma).then((res)=>{
                        console.log(res.data)
                        if(res.data){
                            this.dialogErro = true
                        }
                    }).catch(()=>{
                        this.dialogErro = false
                    })
                }
                if(this.pessoa.Nome_Completo){
                    console.log("teste nome completo")
                    ManutencaoService.existsbyNomeCompleto(this.pessoa.Nome_Completo).then((res)=>{
                        console.log(res.data)
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
                this.pessoa.idPlataforma = null
                this.pessoa.Nome_Completo = null
            },
            nada(){
                console.log("teste")
            }
        }
    }
</script>

<style>

</style>
