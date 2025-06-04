<template>
  <div>
    <!-- Navigacijska traka -->
    <div class="bg-blue-300 p-10 text-black flex justify-center">
      <nav class="space-x-4">
        <RouterLink to="/">HomePage</RouterLink>
        <RouterLink to="/JavniPrijevoz">Javni Prijevoz</RouterLink>
      </nav>
    </div>

    <!-- Prikaz aktivne stranice -->
    <div class="p-4">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
