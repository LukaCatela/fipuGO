<template>
    <div class="text-black">
        <h2 class="text-xl font-bold">Kosarica</h2>
        <ul>
            <li v-for="(item, index) in store.kosarica" :key="index">{{ item }}</li>
        </ul>
<h2 class="text-xl font-bold">kolicina</h2>
        <ul>
            <li v-for="(kolicina, vrsta) in store.karta" :key="vrsta">{{ vrsta }}: {{ kolicina }}</li>
        </ul>
    </div>
    <RouterLink to="/store" class="px-4 py-2 bg-blue-500 text-white rounded">Nazad u Store</RouterLink>

</template>

<script setup>
import { useKartStore } from '@/store/kartStore'
import { RouterLink } from 'vue-router'
const store = useKartStore()


</script>