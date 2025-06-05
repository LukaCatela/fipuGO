import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue'
import PrijevozPula from "@/views/PrijevozPula.vue";
import RegisterView from "@/views/RegisterView.vue";
import LogInView from "@/views/LogInView.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component:HomeView,
        },
        {
            path: '/homepage',
            name: 'homepage',
            redirect: "/",
        },
        {
            path: '/javniprijevoz',
            name: 'javniPrijevoz',
            component:PrijevozPula,
        },
        {
            path: '/register',
            name: 'Registracija',
            component:RegisterView,
        },
        {
            path: '/login',
            name: 'LogIn',
            component:LogInView,
        },
    ],

})
export default router