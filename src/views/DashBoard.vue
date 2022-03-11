<template>
    <div class="dashboard-editor-container">
<!-- 
        <github-corner class="github-corner" />

        <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

        <v-row :gutter="32" style="justify-content: center">
            <v-col :xs="24" :sm="24" :lg="12">
                <div class="chart-wrapper">
                    <h1>PUBLICAÇÕES</h1>
                    <v-tabs
                        v-model="model"
                        centered
                        slider-color="yellow"
                    >
                        <v-tab :key = "1" :href = "`#tab-1`">Gráfico</v-tab>
                        <v-tab :key = "2" :href = "`#tab-2`">Tabela Capitulos de Livro</v-tab>
                        <v-tab :key = "3" :href = "`#tab-2`">Tabela Periodicos</v-tab>
                        <v-tab :key = "4" :href = "`#tab-2`">Tabela Artigos em Eventos</v-tab>
                    </v-tabs>
                        <v-tabs-items v-model="model">
                            <v-tab-item :key="1" :value="`tab-1`" style="justify-content: center;padding-top: 20px">
                                <pie-chart />
                            </v-tab-item>
                            <v-tab-item :key="2" :value="`tab-2`">
                                <v-simple-table>
                                    <template v-slot:default>
                                    <thead>
                                        <tr>
                                        <!--<th class="text-left">Id</th>-->
                                        <th class="text-left">Sequencia de Produção</th>
                                        <th class="text-left">DOI</th>
                                        <th class="text-left">ISBN</th>
                                        <th class="text-left">Título do Trabalho</th>
                                        <th class="text-left">Ano do Trabalho</th>
                                        <th class="text-left">Título do Livro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td v-if="capitulos.length<1" colspan="5">Sem dados para mostrar</td>
                                        </tr>
                                        <tr v-for="item in capitulos" :key="item.id">
                                        <td>{{item.fkCapitulo.sequencia_PRODUCAO }}</td>
                                        <td>{{item.fkCapitulo.doi }}</td>
                                        <td>{{item.fkCapitulo.isbn }}</td>
                                        <td>{{item.fkCapitulo.titulo }}</td>
                                        <td>{{item.fkCapitulo.ano_TRABALHO }}</td>
                                        <td>{{item.fkCapitulo.livro_TITULO }}</td>
                                        <!--<td>{{item.numero}}</td>
                                        <td>{{formatDate(item.data)}}</td>
                                        <td>{{formatDate(item.dataFechamento)}}</td>
                                        <td v-if="item.publicado">{{formatDate(item.dataCirculacao)}}</td>
                                        <td v-else style="color:red">{{formatDate(item.dataCirculacao)}}</td>
                                        <td style="width:170px">
                                            <v-btn   color="primary" @click="edit(item.id)" >
                                            <v-icon>far fa-edit</v-icon>
                                            </v-btn>


                                        </td>-->
                                        </tr>
                                    </tbody>

                                        <tfoot>
                                    
                                    </tfoot>
                                    </template>
                                </v-simple-table>

                            </v-tab-item>
                        </v-tabs-items>
                           
                </div>
            </v-col>
            <v-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <bar-chart />
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
// import GithubCorner from '../components/GithubCorner'
import BarChart from '../components/BarChart.vue'
import PieChart from '../components/PieChart.vue'
import * as DashBoardService from '../services/DashBoardService.js'
// import PanelGroup from '../components/PanelGroup.vue'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
}

export default {
    components:{
        // GithubCorner,
        BarChart,
        PieChart,
        // PanelGroup
    },
    data() {
        return {
            lineChartData: lineChartData.newVisitis,
            model: 'tab-1',
            capitulos: [],
        }
    },
    methods: {
        handleSetLineChartData(type) {
            this.lineChartData = lineChartData[type]
        }
    },
    mounted(){
        DashBoardService.listCapitulos(3097665029936012).then((res)=>{
            console.log(res.data)
            this.capitulos = res.data
        })
    }
}
</script>

<style lang="scss" scoped>
    .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }

  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
  }
  @media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
