<template>
    <v-app>
        <div style="display: flex;justify-content: center;margin-bottom: 40px">
            <h2>Manutenção</h2>
        </div>
        <v-form>
            <v-row style="justify-content: center">
                <v-col
                    style="margin: 10px"
                    cols="12"
                    md="3"
                >
                    <v-text-field
                        label="Nome Completo"
                        solo
                        dense
                    ></v-text-field>
                </v-col>
                <v-col
                    style="margin: 10px"
                    cols="12"
                    md="3"
                >
                    <v-text-field
                        label="Id Plataforma"
                        solo
                        dense
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
                        solo
                        dense
                    ></v-select>
                </v-col>
                <v-col style="margin: 15px"
                    cols="6"
                    md="2">
                    <i class="fas fa-plus-circle" style="font-size:30px" @click="nada"></i>
                </v-col>
            </v-row>
        </v-form>
        <v-card-actions>
            <v-row  justify="center" no-gutters>
              <v-col align="center">
                <v-btn
                color="primary"
                style="border-radius: 8px"
                dark>
                    Salvar
                </v-btn>
              </v-col>
            </v-row>
        </v-card-actions>
    </v-app>
</template>

<script>
    export default{
        data:()=>{
            return {
                items: [{nome: "Lattes", id: "L"},{nome: "Scholar", id: "S"},{nome:"OCID",id:"O"}]
            }
        },
        methods:{
            addElements(){
                this.items.push
            },
            nada(){
                console.log("teste")
            }
        }
    }
</script>

<style>

</style>
