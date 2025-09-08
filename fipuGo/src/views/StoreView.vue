<template>
    <div class="relative min-h-screen flex flex-row">

        <div class="flex flex-wrap justify-start gap-6 w-2/3">

            <div v-for="karta in store.karte" :key="karta.vrsta" class="m-3 relative w-[800px] h-[150px] bg-gray-800 p-6 rounded-xl">
                <h2 class="text-left text-amber-400 text-xl font-bold">{{ karta.vrsta }}</h2>
                <p class="text-white">Cijena: {{ karta.cijena }}€</p>
                <div class="flex items-center absolute bottom-5 right-5">
    <!--plus--> <button @click="store.minus(karta.vrsta)" class="px-3 m-1 bg-gray-500 text-white rounded-lg cursor-pointer">-</button>
                    <div class="text-amber-400 px-4">{{ store.count[karta.vrsta] }}</div>
    <!--minus--> <button @click="store.plus(karta.vrsta)" class="px-4 m-1 bg-gray-500 text-white rounded-lg cursor-pointer">+</button>
                </div>
            </div>
        </div>

        

            <div class="bg-gray-300 w-1/3 h-[300px] rounded-xl relative p-5">
                <div class="text-black m-5">
                    <ul>
                        <li v-for="(kolicina, vrsta) in store.karta" :key="vrsta" class="flex items-center mb-2 gap-5">
                            <p>{{ vrsta }} - {{ store.karte.find(k => k.vrsta === vrsta)?.cijena }}€ x{{ kolicina }} = {{ store.karte.find(k => k.vrsta === vrsta)?.cijena * kolicina }}€</p>
                            <div class="flex gap-2">
                                <button @click="store.obrisiJednu(vrsta)" class="bg-red-700 text-white w-[20px] h-[20px] rounded-lg flex items-center justify-center cursor-pointer">-</button>
                                <button @click="store.obrisiSve(vrsta)" class="bg-red-700 text-white w-[20px] h-[20px] font-bold rounded-lg flex items-center justify-center cursor-pointer">X</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="flex justify-between mt-2">
                    <button @click="store.dodaj()" class="px-3 absolute bottom-5 right-5 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-700">Dodaj</button>
                    <RouterLink to="/kart" class="px-3  absolute bottom-5 left-5 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-700">Idi u kosaricu</RouterLink>
                </div>
                <div>Bodovi:  </div>
            </div>
    </div>

    
</template>

<script setup>
import { useKartStore } from '@/store/kartStore'
import { RouterLink } from 'vue-router'

const store = useKartStore()



</script>