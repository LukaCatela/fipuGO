<template>
  <div class="bg-gray-800 p-6 text-amber-400 flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <img src="/logo.svg" alt="FipuGO Logo" class="h-10 w-auto" />
    </div>

    <nav class="flex space-x-6 font-bold">
      <RouterLink to="/" class="hover:text-amber-200">Početna stranica</RouterLink>
      <RouterLink to="/javniprijevoz" class="hover:text-amber-200">Javni Prijevoz</RouterLink>
      <RouterLink to="/vozniRed" class="hover:text-amber-200">Vozni red</RouterLink>
      <div v-if="userStore.user" class="space-x-6">
        <RouterLink to="/karte" class="hover:text-amber-200">Vaše karte</RouterLink>
        <RouterLink to="/store" class="hover:text-amber-200">Trgovina</RouterLink>
      </div>
      

      <RouterLink v-if="isAdmin" to="/overview" class="hover:text-amber-200">Pregled</RouterLink> <!--ako je admin onda prikaži stranicu-->
    </nav>

    <div class="flex items-center space-x-6">
      <template v-if="!userStore.user">
        <RouterLink to="/register" class="hover:text-amber-200 font-bold">Registracija</RouterLink>
        <RouterLink to="/login" class="hover:text-amber-200 font-bold">Prijava</RouterLink>
      </template>
      <template v-else>
        <span class="flex items-right justify-end space-x-6">Pozdrav, {{ userStore.user?.ime || userStore.user?.displayName || "Korisnik" }}</span>
        <a href="#" @click="logOut" class="hover:text-amber-200 font-bold">Odjava</a>
      </template>
    </div>
  </div>
</template>


<script setup>

import router from '@/router';
import { useUserStore } from '@/store/user';
import { RouterLink } from 'vue-router';
import { auth } from '@/firebase';
import { computed } from 'vue';

const userStore = useUserStore();
const isAdmin = computed(()=> userStore.user?.rola==='admin'); // skraćeno da ne pišemo uvjete gore u v-if-u


console.log(userStore.user?.ime)
 function logOut() {
      auth.signOut().then(() => {
        userStore.clearUser();
        router.push("/login");
      });
}
</script>
