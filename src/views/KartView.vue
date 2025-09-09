<template>
    <div class="m-2 flex flex-col items-start w-1/3">
        <div class="bg-gray-300 w-[250px] h-[400px] rounded-xl relative p-5">           
            <ul class="text-black mb-10">
                <li v-for="(kolicina, vrsta) in store.karta" :key="vrsta" class="flex justify-between items-center mb-2">
                    <p>{{ vrsta }} - {{ store.karte.find(k => k.vrsta === vrsta)?.cijena }}€ x{{ kolicina }} </p>
                    <div class="flex gap-2">
                        <button @click="store.obrisiJednu(vrsta)" class="bg-red-700 text-white w-[20px] h-[20px] rounded-lg flex items-center justify-center cursor-pointer">-</button>
                        <button @click="store.obrisiSve(vrsta)" class="bg-red-700 text-white w-[20px] h-[20px] font-bold rounded-lg flex items-center justify-center cursor-pointer">X</button>
                    </div>
                </li>
            </ul>
                    
            <p class="absolute bottom-16 left-5 font-bold">Ukupno: {{ ukupno }}€</p>
            <button @click="store.placanje()" class="absolute bottom-5 left-5 w-[50px] h-[30px] bg-green-500 hover:bg-green-700 rounded-xl">Kupi</button>
        </div>
        <RouterLink to="/store" class="mt-5 px-4 py-2 bg-blue-500 text-white rounded">Nazad u Store</RouterLink>
    </div>
</template>

<script setup>
import { useKartStore } from '@/store/kartStore'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
const store = useKartStore()

const ukupno = computed(() => {
   return Object.entries(store.karta || {}).reduce((total, [vrsta, kolicina]) => {
        const cijena = store.karte.find(k => k.vrsta === vrsta)?.cijena || 0 
        return total + cijena * kolicina
    }, 0)
})

</script>