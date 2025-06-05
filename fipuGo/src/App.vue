<script setup>
    import Footer from '@/components/Footer.vue';
    import Header from '@/components/Header.vue'
    import BodyFipuGo from '@/components/BodyFipuGo.vue';
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <Header/>

    <div class="flex-1 flex justify-center">
      <BodyFipuGo/>
    </div>

    <Footer/>
  </div>
</template>
