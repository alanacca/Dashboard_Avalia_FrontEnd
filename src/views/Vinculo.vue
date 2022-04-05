<template>
    <v-app class="fonte">
        <div style="display: flex;justify-content: center;margin-bottom: 40px">
            <h2>Vinculação</h2>
        </div>
        <v-data-table 
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            :headers="headers" 
            :items="items" 
            class="item-table"
        >
            <template v-slot:[`item.mestrado`]="{ item }">
                <v-simple-checkbox v-model="item.mestrado" :ripple="false"></v-simple-checkbox>
            </template>
            <template v-slot:[`item.doutorado`]="{ item }">
                <v-simple-checkbox v-model="item.doutorado" :ripple="false"></v-simple-checkbox>
            </template>
            </v-data-table>
            <div class="text-center pt-2">
                <v-pagination
                    v-model="page"
                    :length="pageCount"
                ></v-pagination>
            </div>
            <v-card-actions style="justify-content: center;align-items: center;display:grid;margin-bottom: 10px">
                <v-btn color="primary" @click="testandoSave()">
                    Salvar
                </v-btn>
            </v-card-actions>
            <v-dialog
                v-model="dialogSucesso"
                max-width="290"
            >
    
        <v-card>
            <v-card-title class="text-h5">
            Sucesso
            </v-card-title>
            <v-card-text>Lista Atualizada com Sucesso</v-card-text>
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
    </v-app>
</template>

<script>

import * as VinculoService from '../services/VinculoService'
import * as ManutencaoService from '../services/ManutencaoService'

export default {
    data() {
       return {
            dialogSucesso: false,
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,
            dialogExcluir: false,
            model: '1',
            vinculo: 1,
            items: [],
            selec: [],
      loading: false,
      search: '',
      pessoaExcluir: null,
      posicaoExcluir: null,
      selected: [],
      coiso: [],
      existePessoa: false,
      mestrado: false,
      doutorado: false,
      headers: [
      {
        text: "NOME PROFESSOR",
        align: "start",
        sortable: false,
        value: "nomeCompleto",
      },
      { text: "MESTRADO", value: "mestrado" },
      { text: "DOUTORADO", value: "doutorado" },
    ],
       } 
    },
    methods: {
        confirmarSucesso(){
                this.dialogSucesso = false
        },
        testandoSave(){
            console.log(this.items)
            VinculoService.atualizarLista(this.items).then(()=>{
                // console.log(res.data)
                this.dialogSucesso = true
            })
        },
    },
    beforeMount(){
        ManutencaoService.findAll().then((res)=>{
            // console.log(res.data)
            this.items = res.data
        })
        
        
    }
}
</script>

<style scope lang="scss">

.v-data-table>.v-data-table__wrapper>table>tbody>tr>td {

    font-size: 20px !important
}

.v-data-table>.v-data-table__wrapper>table>thead>tr>th {
    font-size: 15px !important;
}


</style>