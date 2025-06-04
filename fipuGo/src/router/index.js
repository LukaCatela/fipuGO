import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue'
import PrijevozPula from "@/views/PrijevozPula.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component:HomeView,
        },
        {
            path: '/JavniPrijevoz',
            name: 'javniPrijevoz',
            component:PrijevozPula,
        },
    ],

})
export default router