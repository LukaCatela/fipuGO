<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div>
    <div v-if="route.path === '/javniprijevoz'">
      <RouterLink to="/javniprijevoz"></RouterLink>
    </div>
    <div v-if="route.path === '/homepage'">
      <RouterLink to="/homepage"></RouterLink>
    </div>
    <div v-if="route.path === '/register'">
      <RouterLink to="/"></RouterLink>
    </div>

    <RouterView />
  </div>
</template>