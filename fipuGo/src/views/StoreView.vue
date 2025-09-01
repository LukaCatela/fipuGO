<template>
    <div class="flex flex-wrap justify-start gap-6">
         <h2 class="text-xl font-bold mb-4">Odaberi karte</h2>
        <div v-for="vrsta in store.karte" :key="vrsta" class="m-3 relative w-[1500px] h-[150px] bg-gray-800 p-6 rounded-xl">
            <h2 class="text-left text-white text-xl font-bold">{{ vrsta }}</h2>
            
            <div class="flex items-center absolute bottom-15 right-5">
<!--plus-->     <button @click="store.minus(vrsta)" class="px-3 m-1 bg-gray-500 text-white rounded-lg cursor-pointer">-</button>
                <div class="text-white px-4">{{ store.count[vrsta] }}</div>
<!--minus-->    <button @click="store.plus(vrsta)" class="px-4 m-1 bg-gray-500 text-white rounded-lg cursor-pointer">+</button>
            </div>
        </div>
    </div>

    <button @click="store.dodaj()" class="px-4 absolute bottom-5 right-5 bg-green-500 text-white rounded-lg cursor-pointer">Dodaj</button>
    <RouterLink to="/kart" class="px-4 py-2 bg-blue-500 text-white rounded">Idi u kosaricu</RouterLink>
</template>

<script setup>
import { useKartStore } from '@/store/kartStore'
import { RouterLink } from 'vue-router'

const store = useKartStore()



</script>