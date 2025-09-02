<script setup>
    import Footer from '@/components/Footer.vue';
    import Header from '@/components/Header.vue'
    import BodyFipuGo from '@/components/BodyFipuGo.vue';
    import { auth, db } from '@/firebase';
    import { doc, getDoc } from 'firebase/firestore';
    import useUserStore from '@/store/user';
    import { onMounted } from 'vue';

    const userStore = useUserStore();
    onMounted(()=>{
      auth.onAuthStateChanged(async (user) =>{
        if(user){
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            userStore.setUser(data);
          } else {
            console.log('Korisnik ne postoji u Firestore-u');
            userStore.clearUser();
          }
      } else {
        userStore.clearUser();
      }
      })
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
