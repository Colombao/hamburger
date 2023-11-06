import App from "@/App.vue"; // Importe o layout de login
import MainLayout from "@/MainLayout.vue"; // Importe o layout de login
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
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
        children: [
            {
                path: "",
                name: "home",
                component: HomeView,
            },
            {
                path: "/Pedidos",
                name: "Pedidos",
                component: PedidosView,
            },
            {
                path: "/Sobre",
                name: "Sobre",
                component: SobreView,
            },
            {
                path: "/Funcionario",
                name: "Funcionario",
                component: IngredientEdit, // Usando HomeView, ajuste conforme necessário
            },
            {
                path: "/ingredientes/edit/:id",
                name: "IngredientEdit",
                component: IngredientEdit,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
