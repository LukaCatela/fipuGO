<template>
    <div class="flex flex-wrap justify-start gap-6">
        <div v-for="vrsta in karte" :key="vrsta" class="m-3 relative w-[1500px] h-[150px] bg-gray-800 p-6 rounded-xl">
            <h2 class="text-left text-white text-xl font-bold">{{ vrsta }}</h2>
            
            <div class="flex items-center absolute bottom-15 right-5">
<!--plus-->     <button @click="minus(vrsta)" class="px-3 m-1 bg-gray-500 text-white rounded-lg cursor-pointer">-</button>
                <div class="text-white px-4">{{ count[vrsta] }}</div>
<!--minus-->    <button @click="plus(vrsta)" class="px-4 m-1 bg-gray-500 text-white rounded-lg cursor-pointer">+</button>
            </div>
        </div>
    </div>

    <button @click="dodaj(vrsta)" class="px-4 absolute bottom-5 right-5 bg-green-500 text-white rounded-lg cursor-pointer">Dodaj</button>
</template>

<script setup>

import { ref } from 'vue'

const karte = ['Dnevna','Tjedna','Mjesecna','Godisnja'];

const kosarica = ref([])
const karta = ref({})
const count = ref({})
karte.forEach(vrsta => count.value[vrsta] = 0)

    function plus(vrsta) {
        count.value[vrsta]++;
    }

    function minus(vrsta) {
        if (count.value[vrsta]>0){
            count.value[vrsta]--;
        }
    }

function dodaj(vrsta){
    karte.forEach(vrsta => {
    const trenutniBroj = count.value[vrsta];
    if (trenutniBroj === 0) return;

    if (!karta.value[vrsta]) {
        karta.value[vrsta] = 0;
    } 
    karta.value[vrsta] += trenutniBroj;

    for (let i=0; i<trenutniBroj; i++){
        kosarica.value.push(vrsta);
    }

    count.value[vrsta] = 0;
});
    console.log('Karta:', karta.value);
    console.log('Kosarica:', kosarica.value);
}

</script>