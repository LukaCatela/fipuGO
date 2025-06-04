<script setup>
    import BodyFipuGo from '@/components/BodyFipuGo.vue';
    import Footer from '@/components/Footer.vue';
    import Header from '@/components/Header.vue'
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <Header/>

    <!-- Glavni sadržaj -->
    <div class="flex-1 flex justify-center">
      <BodyFipuGo />
    </div>

    <!-- Footer uvijek na dnu -->
    <Footer />
  </div>
</template>
