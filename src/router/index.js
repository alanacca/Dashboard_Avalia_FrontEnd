import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Manutencao from '../views/Manutencao.vue'
import DashBoard from '../views/DashBoard.vue'
import Vinculo from '../views/Vinculo.vue'
import calMestrado from '../views/calculoMestrado.vue'
import calDoutorado from '../views/calculoDoutorado.vue'


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
        path: '/dashboard/:idCurriculo/:descPlataforma',
        name: 'DashBoard',
        component: DashBoard,
        props: true
    },
    {
        path: '/vinculo',
        name: 'Vinculo',
        component: Vinculo,
        props: true
    },
    {
        path: '/calculoMestrado',
        name: 'Calculo Mestrado',
        component: calMestrado,
        props: true
    },
    {
        path: '/calculoDoutorado',
        name: 'Calculo Doutorado',
        component: calDoutorado,
        props: true
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router