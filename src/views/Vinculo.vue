<template>
    <v-app>
        <div style="display: flex;justify-content: center;margin-bottom: 40px">
            <h2>Vinculação</h2>
        </div>
            <v-tabs
                v-model="model"
                centered
                slider-color="black"
            >
                <v-tab
                    v-for="i in vinculos"
                    :key="i.id"
                    :href="`#tab-${i.id}`"
                    @change="teste()"
                >
                    {{ i.descricao }}
                </v-tab>
            </v-tabs>
        <v-tabs-items v-model="model" >
            <v-tab-item
                v-for="i in vinculos"
                :key="i.id"
                :value="`#tab-${i.id}`"
            >
                <v-card>
                    <v-card-text>teste</v-card-text>
                </v-card>
            </v-tab-item>

        </v-tabs-items>
        <!-- <v-card
            class="mx-auto"
            max-width="500"
        >
            <v-row
                align="center"
                justify="start"
            >
                <v-col
                    v-for="(selection, i) in selections"
                    :key="selection.text"
                    class="shrink"
                >
                <v-chip
                    :disabled="loading"
                    close
                    @click:close="selected.splice(i, 1)"
                >
                    <v-icon
                        left
                        v-text="selection.icon"
                        ></v-icon>
                        {{ selection.text }}
                </v-chip>
                </v-col>
            </v-row>
            <v-divider v-if="!allSelected"></v-divider>

    <v-list>
      <template v-for="item in categories">
        <v-list-item
          v-if="!selected.includes(item)"
          :key="item.text"
          :disabled="loading"
          @click="selected.push(item)"
        >
          <v-list-item-avatar>
            <v-icon
              :disabled="loading"
              v-text="item.icon"
            ></v-icon>
          </v-list-item-avatar>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </template>
    </v-list>

    <v-divider></v-divider>
  </v-card> -->
    </v-app>
</template>

<script>

import * as VinculoService from '../services/VinculoService'

export default {
    data() {
       return {
           model: 'tab-1',
           vinculos: [],
           items: [
        {
          text: 'Nature',
          icon: 'mdi-nature',
        },
        {
          text: 'Nightlife',
          icon: 'mdi-glass-wine',
        },
        {
          text: 'November',
          icon: 'mdi-calendar-range',
        },
        {
          text: 'Portland',
          icon: 'mdi-map-marker',
        },
        {
          text: 'Biking',
          icon: 'mdi-bike',
        },
      ],
      loading: false,
      search: '',
      selected: [],
       } 
    },
    computed:{
        allSelected () {
            return this.selected.length === this.items.length
        },
        categories () {
            const search = this.search.toLowerCase()
            if (!search) return this.items
                return this.items.filter(item => {
                    const text = item.text.toLowerCase()
                    return text.indexOf(search) > -1
            })
        },
        selections () {
            const selections = []
            for (const selection of this.selected) {
            selections.push(selection)
            }
            return selections
        },

    },
    watch: {
        selected () {
            this.search = ''
        },
    },
    methods: {
        teste(){
            console.log(this.model)
        },
      next () {
        this.loading = true
        setTimeout(() => {
          this.search = ''
          this.selected = []
          this.loading = false
        }, 2000)
      },
    },
    beforeMount(){
        VinculoService.findAll().then((res)=>{
            this.vinculos = res.data
        })
        VinculoService.findSpecific(1).then((res)=>{
            console.log(res)
        })
    }
}
</script>

<style lang="scss">

</style>