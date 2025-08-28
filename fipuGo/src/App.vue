<script setup>
    import Footer from '@/components/Footer.vue';
    import Header from '@/components/Header.vue'
    import BodyFipuGo from '@/components/BodyFipuGo.vue';
    import { auth } from '@/firebase';
    import useUserStore from '@/store/user';

    const useStore = useUserStore();
    auth.onAuthStateChanged((user) =>{
      if(user){
        console.log('***',user.email);
        useStore.setUser(user.email);
      }else{
        console.log('*** No user')
        useStore.clearUser();
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
