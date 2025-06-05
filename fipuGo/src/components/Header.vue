<template>
  <div>
    <!-- Navigacijska traka -->
    <div class="bg-gray-800 p-10 text-amber-400 flex items-center relative">
      <nav class="absolute left-1/2 transform -translate-x-1/2 space-x-4">

        <RouterLink to="/" class="hover:underline">HomePage</RouterLink>
        <RouterLink to="/javniprijevoz" class="hover:underline">Javni Prijevoz</RouterLink>

      </nav>
      <div class="ml-auto">
        <RouterLink to="/register" class="hover:underline">Register</RouterLink>

        <span> / </span>

        <RouterLink to="/login" class="hover:underline">Log In</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
