<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div>
    <div v-if="route.path === '/JavniPrijevoz'">
      <RouterLink to="/JavniPrijevoz">Log In</RouterLink>
    </div>

    <RouterView />
  </div>
</template>