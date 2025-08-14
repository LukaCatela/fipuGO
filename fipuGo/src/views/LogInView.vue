<template>
    <h1 class="flex flex-col justify-center items-center my-5"><b>Log In</b></h1>
    <div class="flex flex-col justify-center items-center my-5">
        <input type="email" v-model="username" placeholder="Upisi email" id="email" class="border-1 rounded-lg p-1">
        <input type="password" v-model="password" placeholder="Upisi lozinku" id="lozinka" class="border-1 rounded-lg my-5 p-1">
        <button @click="ulogiraj" class="border-1 rounded-lg bg-gray-700 w-s hover:bg-gray-500 p-1">Log in</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import router from '@/router';

const username = ref("");
const password = ref("");

function ulogoiraj(){
    signInWithEmailAndPassword(auth, username.value, password.value).then((resault) => {
        console.log("Uspjesna prijava", resault);
        router.replace("/");
    }).catch((e) =>{
        console.error("Greska: ",e);
    })
};
</script>