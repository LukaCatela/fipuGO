<template>
    <h1 class="flex flex-col justify-center items-center my-5"><b>Log In</b></h1>
    <div class="flex flex-col justify-center items-center my-5">
        <input type="email" v-model="username" placeholder="Upisi email" id="email" class="border-1 rounded-lg p-1">
        <input type="password" v-model="password" placeholder="Upisi lozinku" id="lozinka" class="border-1 rounded-lg my-5 p-1">
        <button @click="ulogiraj" class="border-1 rounded-lg bg-gray-700 w-s hover:bg-gray-500 p-1">Log in</button>
        <span :class="response.error ? 'text-rose-600 ' : 'text-emerald-600'">{{ response.message }}</span>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import router from '@/router';

const username = ref("");
const password = ref("");
const response = ref({ error: false, message: '' })

// ovdje je bio bug krivo napisano ime funkcije :)
/*
function ulogiraj(){
    signInWithEmailAndPassword(auth, username.value, password.value).then((resault) => {
        console.log("Uspjesna prijava", resault);
        router.replace("/"); // push metoda dodaje samo novu rutu u povijest browsera, dok replace poslije uspješnog ulogiranja, mjenja rutu na novu.
    }).catch((e) =>{
        console.error("Greska: ",e);
    })
};
*/
const ulogiraj = async () =>{
    try{
        await signInWithEmailAndPassword(auth, username.value, password.value);
        response.value.error = false;
        response.value.message = 'Korisnik je prijavljen'
        router.push("/home");
    } catch (error) {
        response.value.error = true;
        response.value.message = 'Greška pri prijavi: ' + error.message;
    }
}
</script>