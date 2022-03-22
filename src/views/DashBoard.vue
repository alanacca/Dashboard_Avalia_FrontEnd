<template>
    <div class="dashboard-editor-container">
<!-- 
        <github-corner class="github-corner" />

        <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
        <div style="justify-items: center; align-item: center; display: grid">
            <h3>Plataforma: {{descPlataforma}}</h3>
            <h1 v-if="currentCurriculo">{{currentCurriculo.nome_COMPLETO}}</h1>
            <p v-if="currentCurriculo">{{currentCurriculo.resumo_CV}}</p>
        </div>

        <v-row :gutter="32">
            <v-col :xs="24" :sm="24" :lg="12">
                <div class="chart-wrapper">
                    <h1>Publicações</h1>
                    <v-tabs
                        v-model="model"
                        centered
                        slider-color="yellow"
                    >
                        <v-tab :key = "1" :href = "`#tab-1`">Gráfico</v-tab>
                        <v-tab :key = "2" :href = "`#tab-2`">Tabela Capitulos de Livro</v-tab>
                        <v-tab :key = "3" :href = "`#tab-3`">Tabela Periodicos</v-tab>
                        <v-tab :key = "4" :href = "`#tab-4`">Tabela Artigos em Eventos</v-tab>
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
                                        <td v-if="pageCapitulos.content.length < 1" colspan="5">Sem dados para mostrar</td>
                                        </tr>
                                        <tr v-for="item in pageCapitulos.content" :key="item.id">
                                        <td>{{item.fkCapitulo.sequencia_PRODUCAO }}</td>
                                        <td>{{item.fkCapitulo.doi }}</td>
                                        <td>{{item.fkCapitulo.isbn }}</td>
                                        <td>{{item.fkCapitulo.titulo }}</td>
                                        <td>{{item.fkCapitulo.ano_TRABALHO }}</td>
                                        <td>{{item.fkCapitulo.livro_TITULO }}</td>
                                        </tr>
                                    </tbody>

                                        <tfoot>
                                    
                                    </tfoot>
                                    </template>
                                </v-simple-table>
                                <div class="text-center">
                                    <v-pagination :value="pageCapitulos.pageable.pageNumber + 1"    :total-visible="10"
                                    :length="pageCapitulos.totalPages" @input="atualizarPaginaCapitulo" >                
                                    </v-pagination>
                                </div>


                            </v-tab-item>
                            <v-tab-item :key="3" :value="`tab-3`">
                                <v-simple-table>
                                    <template v-slot:default>
                                    <thead>
                                        <tr>
                                        <!--<th class="text-left">Id</th>-->
                                        <th class="text-left">Sequencia de Produção</th>
                                        <th class="text-left">DOI</th>
                                        <th class="text-left">ISSN </th>
                                        <th class="text-left">Título do Artigo </th>
                                        <th class="text-left">Ano do Artigo</th>
                                        <th class="text-left">Título do Periodico ou Revista</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td v-if="pagePeriodicos.content.length < 1" colspan="5">Sem dados para mostrar</td>
                                        </tr>
                                        <tr v-for="item in pagePeriodicos.content" :key="item.id">
                                        <td>{{item.fkPeriodicos.sequencia_PRODUCAO }}</td>
                                        <td>{{item.fkPeriodicos.doi }}</td>
                                        <td>{{item.fkPeriodicos.issn }}</td>
                                        <td>{{item.fkPeriodicos.titulo_DO_ARTIGO }}</td>
                                        <td>{{item.fkPeriodicos.ano_DO_ARTIGO }}</td>
                                        <td>{{item.fkPeriodicos.titulo_DO_PERIODICO_OU_REVISTA }}</td>

                                        </tr>
                                    </tbody>

                                        <tfoot>
                                    
                                    </tfoot>
                                    </template>
                                </v-simple-table>
                                <div class="text-center">
                                    <v-pagination :value="pagePeriodicos.pageable.pageNumber + 1"    :total-visible="10"
                                    :length="pagePeriodicos.totalPages" @input="atualizarPaginaPeriodico" >                
                                    </v-pagination>
                                </div>


                            </v-tab-item>

                            <v-tab-item :key="4" :value="`tab-4`">
                                <v-simple-table>
                                    <template v-slot:default>
                                    <thead>
                                        <tr>
                                        <!--<th class="text-left">Id</th>-->
                                        <th class="text-left">Sequencia de Produção</th>
                                        <th class="text-left">Nome do Evento </th>
                                        <th class="text-left">Classificação do Evento </th>
                                        <th class="text-left">País do Evento </th>
                                        <th class="text-left">Título do Trabalho</th>
                                        <th class="text-left">Ano do Trabalho</th>
                                        <th class="text-left">Titulo Anais</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td v-if="pageArtigos.content.length < 1" colspan="5">Sem dados para mostrar</td>
                                        </tr>
                                        <tr v-for="item in pageArtigos.content" :key="item.id">
                                        <td>{{item.fkArtigoEvento.sequencia_PRODUCAO }}</td>
                                        <td>{{item.fkArtigoEvento.nome_EVENTO }}</td>
                                        <td>{{item.fkArtigoEvento.classificacao_EVENTO }}</td>
                                        <td>{{item.fkArtigoEvento.pais_EVENTO }}</td>
                                        <td>{{item.fkArtigoEvento.titulo }}</td>
                                        <td>{{item.fkArtigoEvento.ano_TRABALHO }}</td>
                                        <td>{{item.fkArtigoEvento.titulo_ANAIS_OU_PROCEEDINGS }}</td>

                                        </tr>
                                    </tbody>

                                        <tfoot>
                                    
                                    </tfoot>
                                    </template>
                                </v-simple-table>
                                <div class="text-center">
                                    <v-pagination :value="pageArtigos.pageable.pageNumber + 1"    :total-visible="10"
                                    :length="pageArtigos.totalPages" @input="atualizarPaginaArtigo" >                
                                    </v-pagination>
                                </div>


                            </v-tab-item>
                            
                        </v-tabs-items>
                    
                           
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
// import GithubCorner from '../components/GithubCorner'
// import BarChart from '../components/BarChart.vue'
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
    props:["idCurriculo","descPlataforma"],
    components:{
        // BarChart,
        PieChart,
    },
    data() {
        return {
            currentCurriculo: null,
            lineChartData: lineChartData.newVisitis,
            model: 'tab-1',
            pageCapitulos: {content: {length:0}, pageable: {pageNumber:0}},
            pageArtigos: {content: {length:0}, pageable: {pageNumber:0}},
            pagePeriodicos: {content: {length:0}, pageable: {pageNumber:0}}

        }
    },
    methods: {
        handleSetLineChartData(type) {
            this.lineChartData = lineChartData[type]
        },
        atualizarPaginaCapitulo(ev){
            DashBoardService.listCapitulos(this.idCurriculo,ev-1).then((res)=>{
                this.pageCapitulos = res.data
            })
        },
        atualizarPaginaArtigo(ev){
            DashBoardService.listArtigos(this.idCurriculo,ev-1).then((res)=>{
                this.pageArtigos = res.data
            })
        },
        atualizarPaginaPeriodico(ev){
            DashBoardService.listPeriodicos(this.idCurriculo,ev-1).then((res)=>{
                this.pagePeriodicos = res.data
            })
        }
    },
    mounted(){
        console.log(this.idCurriculo)
        DashBoardService.listCapitulos(this.idCurriculo,0).then((res)=>{
            console.log(this.idCurriculo)
            // console.log(res.data)
            this.pageCapitulos = res.data
        })
        DashBoardService.listArtigos(this.idCurriculo,0).then((res)=>{
            // console.log(res.data)
            this.pageArtigos = res.data
        })
        DashBoardService.listPeriodicos(this.idCurriculo,0).then((res)=>{
            // console.log(res.data)
            this.pagePeriodicos = res.data
        })
        
    },
    beforeMount(){
        DashBoardService.findByCurriculo(this.idCurriculo).then((res)=>{
            this.currentCurriculo = res.data
            console.log(this.currentCurriculo)
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

    .chart-wrapper h1 {
        justify-content: center;
        align-content: center;
        display: grid
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
