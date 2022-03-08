import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Manutencao from '../views/Manutencao.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/manutencao',
        component: Manutencao
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router