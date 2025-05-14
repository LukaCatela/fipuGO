<script setup>
    import BodyFipuGo from '@/components/BodyFipuGo.vue';
    import Footer from '@/components/Footer.vue';
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <!-- Glavni sadržaj -->
    <div class="flex-1 flex justify-center">
      <BodyFipuGo />
    </div>

    <!-- Footer uvijek na dnu -->
    <Footer />
  </div>
</template>
