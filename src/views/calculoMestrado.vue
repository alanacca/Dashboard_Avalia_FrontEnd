<template>
        <v-list three-line>
            <v-subheader style="justify-content: center; font-size: 20px">{{header}}</v-subheader>
            <v-list-item-group
                v-model="selected"
                active-class="blue--text"
            >
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    :value="item.idPessoa"
                    @click="teste()"
                    >
                    <v-list-item-content>
                        <v-list-item-title v-text="item.nomeCompleto"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
            </v-list-item-group>
        </v-list>
</template>

<script>

import * as MestradoService from '../services/MestradoService'

  export default {
    props:{
        value: Object
    },
    data: () => ({
        header: 'Professores do Mestrado',
        items: [],
        selected: null
    }),
    methods:{
        teste(){
            console.log(this.selected)
        }
    },
    beforeMount(){
        MestradoService.getMestrado().then((res)=>{
            this.items = res.data
            this.selected = this.items[0].idPessoa
        })
        
    }
  }
</script>