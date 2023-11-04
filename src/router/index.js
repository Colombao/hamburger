import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: HomeView
},
  {
    path: '/Pedidos',
    name: 'Pedidos',// route level code-splitting // this generates a separate chunk (about.[hash].js) for this route // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "Pedidos" */ '../views/Pedidos.vue')
  },
  { 
    path: '/Login',
    name: 'Login_form',
    component: () => import( /* webpackChunkName: "Pedidos" */ '../views/Login_form.vue')
  },
  { 
    path: '/Cadastro',
    name: 'Cadastro',
    component: () => import( /* webpackChunkName: "Pedidos" */ '../views/Cad_form.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router