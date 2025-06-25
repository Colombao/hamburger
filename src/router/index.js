import App from "@/App.vue"; // Importe o layout de login
import MainLayout from "@/MainLayout.vue"; // Importe o layout de login
import { authStore } from "@/store/auth.js"; // Importe o store de autenticação
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import IngredientesView from "../views/IngredientesView.vue";
import LoginView from "../views/LoginView.vue";
import PedidosView from "../views/Pedidos.vue"; // Importe o componente para a rota de Pedidos
import SobreView from "../views/SobreView.vue";

const routes = [
  {
    path: "/",
    component: App, // Use o layout de login para a rota de login
    children: [
      {
        path: "",
        name: "Login",
        component: LoginView,
      },
    ],
  },
  {
    path: "/home",
    component: MainLayout, // Use o layout padrão para a rota de home
    meta: { requiresAuth: true }, // Adiciona meta para indicar que requer autenticação
    children: [
      {
        path: "/home",
        name: "home",
        component: HomeView,
        meta: { requiresAuth: true },
      },
      {
        path: "/Pedidos",
        name: "Pedidos",
        component: PedidosView,
        meta: { requiresAuth: true },
      },
      {
        path: "/Sobre",
        name: "Sobre",
        component: SobreView,
        meta: { requiresAuth: true },
      },
      {
        path: "/Funcionario",
        name: "Funcionario",
        component: IngredientesView, // Usando HomeView, ajuste conforme necessário
        meta: { requiresAuth: true },
      },
      {
        path: "/ingredientes/edit/:id",
        name: "IngredientEdit",
        component: HomeView,
        meta: { requiresAuth: true },
      },
    ],
  },
  // Rota para logout
  {
    path: "/logout",
    name: "Logout",
    beforeEnter: (to, from, next) => {
      authStore.logout();
      next("/");
    },
  },
  // Rota de fallback - redireciona para login se a rota não existe
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guard global para verificar autenticação
router.beforeEach((to, from, next) => {
  // Verifica se já está autenticado ao inicializar
  authStore.checkAuth();

  // Verifica se a rota requer autenticação
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isLoggedIn()) {
    // Se requer autenticação e não está logado, redireciona para login
    next("/");
  } else if (to.path === "/" && authStore.isLoggedIn()) {
    // Se já está logado e tenta acessar a página de login, redireciona para home
    next("/home");
  } else {
    // Permite o acesso
    next();
  }
});

export default router;
