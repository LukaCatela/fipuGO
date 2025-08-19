<script setup>
    import Footer from '@/components/Footer.vue';
    import Header from '@/components/Header.vue'
    import BodyFipuGo from '@/components/BodyFipuGo.vue';
    import { auth } from '@/firebase';
    import store from '@/store';

    auth.onAuthStateChanged((user) =>{
      if(user){
        console.log('***',user.email);
        store.currentUser.value = user.email;
      }else{
        console.log('*** No user')
        store.currentUser.value = null;
      }
    })

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
