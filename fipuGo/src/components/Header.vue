<template>
  <div class="bg-gray-800 p-6 text-amber-400 flex items-center relative">
    
    <!-- Navigacijski linkovi u centru -->
    <nav class="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
      <RouterLink to="/" class="hover:text-amber-200">Home Page</RouterLink>
      <RouterLink to="/javniprijevoz" class="hover:text-amber-200">Javni Prijevoz</RouterLink>
    </nav>

    <!-- Desna strana: Signup / Login / Logout -->
    <div class="ml-auto">
      <div class="flex items-center space-x-6">
        <template v-if="!userStore.user || userStore.user==''">
          <RouterLink to="/register" class="hover:text-amber-200">Signup</RouterLink>
          <RouterLink to="/login" class="hover:text-amber-200">Login</RouterLink>
        </template>
        <template v-else-if="userRola==='admin'">
          <RouterLink to="/overview" class="hover:text-amber-200">Pregled</RouterLink>
        </template>
        <template v-else>
          <a href="#" @click="logOut" class="hover:text-amber-200">Logout</a>
        </template>
      </div>
    </div>

  </div>
</template>

<script setup>
import router from '@/router';
import useUserStore from '@/store/user';
import { RouterLink } from 'vue-router';
import { auth } from '@/firebase';
import { userRola } from '@/views/Overview.vue';

const userStore = useUserStore();
 function logOut() {
      auth.signOut().then(() => {
        userStore.clearUser();
        router.push("/login");
      });
}
</script>
