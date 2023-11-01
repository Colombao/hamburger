import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SobreView from '../views/SobreView.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Pedidos',
    name: 'Pedidos',
    component: () => import( /* webpackChunkName: "Pedidos" */ '../views/Pedidos.vue')
  },
  {
    path: '/Sobre',
    name: 'Sobre',
    component: SobreView
  },
  {
    path: '/Funcionario',
    name: 'Funcionario',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router