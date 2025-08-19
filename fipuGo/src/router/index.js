import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue'
import RegisterView from "@/views/RegisterView.vue";
import LogInView from "@/views/LogInView.vue";
import JavniPrijevoz from "@/views/JavniPrijevoz.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component:HomeView,
        },
        {
            path: '/home',
            name: 'redirecthome',
            redirect: "/",
        },
        {
            path: '/homepage',
            name: 'redirecthomepage',
            redirect: "/",
        },
        {
            path: '/javniprijevoz',
            name: 'javniPrijevoz',
            component:JavniPrijevoz,
        },
        {
            path: '/register',
            name: 'Registracija',
            component:RegisterView,
        },
        {
            path: '/signup',
            redirect: '/register'
        },
        {
            path: '/login',
            name: 'LogIn',
            component:LogInView,
        },
    ],

})
export default router