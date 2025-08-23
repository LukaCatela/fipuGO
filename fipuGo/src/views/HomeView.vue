<template>
  <template v-if="!store.currentUser.value">
        <div class="flex flex-wrap justify-start gap-6">
            <RouterLink to="/javniprijevoz" class="m-6 flex items-center justify-center w-[300px] h-[200px] bg-gray-800 p-6 rounded-2xl">
                <h2 class="text-center text-amber-400 text-xl font-bold color-white" >Karta 🗺</h2>
            </RouterLink>

            <RouterLink to="/voznired" class="m-6 flex items-center justify-center w-[300px] h-[200px] bg-gray-800 p-6  rounded-2xl">
                <h2 class="text-center text-amber-400 text-xl font-bold color-white" >Vozni red 🚌</h2>
            </RouterLink>

        </div>
    </template>

    <template v-else>
        <div class="flex flex-wrap justify-start gap-6">
           <RouterLink to="/store" class="m-6 flex items-center justify-center w-[300px] h-[200px] bg-gray-800 p-6  rounded-2xl">
                <h2 class="text-center text-amber-400 text-xl font-bold color-white" >Store 🏪</h2>
            </RouterLink>

            <RouterLink to="/karte" class="m-6 flex items-center justify-center w-[300px] h-[200px] bg-gray-800 p-6  rounded-2xl">
                <h2 class="text-center text-amber-400 text-xl font-bold color-white" >Vaše karte 🎫</h2>
            </RouterLink>

            <RouterLink to="/javniprijevoz" class="m-6 flex items-center justify-center w-[300px] h-[200px] bg-gray-800 p-6  rounded-2xl">
                <h2 class="text-center text-amber-400 text-xl font-bold color-white" >Karta 🗺</h2>
            </RouterLink>

            <RouterLink to="/voznired" class="m-6 flex items-center justify-center w-[300px] h-[200px] bg-gray-800 p-6  rounded-2xl">
                <h2 class="text-center text-amber-400 text-xl font-bold color-white" >Vozni red 🚌</h2>
            </RouterLink>  
        </div>
    </template>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import store from '@/store';

</script>

