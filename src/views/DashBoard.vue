<template>
    <div class="dashboard-editor-container">
<!-- 
        <github-corner class="github-corner" />

        <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

        <v-row :gutter="32">
            <v-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <h1>PUBLICAÇÕES</h1>
                    <bar-chart />
                </div>
            </v-col>
            <v-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <pie-chart />
                </div>
            </v-col>
            <!-- <v-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <bar-chart />
                </div>
            </v-col> -->
        </v-row>
    </div>
</template>

<script>
// import GithubCorner from '../components/GithubCorner'
import BarChart from '../components/BarChart.vue'
import PieChart from '../components/PieChart.vue'
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
            lineChartData: lineChartData.newVisitis
        }
    },
    methods: {
        handleSetLineChartData(type) {
            this.lineChartData = lineChartData[type]
        }
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
