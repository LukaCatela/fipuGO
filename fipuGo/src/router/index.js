import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue'
import RegisterView from "@/views/RegisterView.vue";
import LogInView from "@/views/LogInView.vue";
import JavniPrijevoz from "@/views/JavniPrijevoz.vue";
import StoreView from "@/views/StoreView.vue";
import KartView from "@/views/KartView.vue";
import VozniRedView from "@/views/VozniRedView.vue";
import KupljeneKarteView from "@/views/KupljeneKarteView.vue";
import Overview from "@/views/OverView.vue";
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
        {
            path: '/store',
            name: 'Store',
            component:StoreView,
        },
        {
            path: '/karte',
            name: 'Karte',
            component:KupljeneKarteView,
        },
        {
            path: '/vozniRed',
            name: 'VozniRed',
            component:VozniRedView,
        },
        {
            path: '/kart',
            name: 'Kart',
            component:KartView,
        },
        {
            path: '/overview',
            name: 'Pregled',
            component: Overview,
        },
    ],

})
export default router