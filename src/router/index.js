import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Manutencao from '../views/Manutencao.vue'
import DashBoard from '../views/DashBoard.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: HomePage
    },
    {
        path: '/manutencao',
        name: 'Manutencao',
        component: Manutencao
    },
    {
        path: '/dashboard/:idCurriculo',
        name: 'DashBoard',
        component: DashBoard,
        props: true
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router