<template>
    <h1 class="flex flex-col justify-center items-center my-5"><b>Register</b></h1>
    <div class="flex flex-col justify-center items-center my-5">
        <input type="email" v-model="username" placeholder="Upisi email" id="email" class="border-1 rounded-lg p-1">
        <input :type="showPassword ? 'text':'password'"  v-model="password" placeholder="Upisi lozinku" id="lozinka" class="border-1 rounded-lg my-5 p-1">
        <input :type="showPassword ? 'text':'password'" v-model="passwordRepeat" placeholder="Ponovno upisi lozinku" id="lozinka_potvrda" class="border-1 rounded-lg p-1">
        <button type="button" @click="togglePassword">
            {{ showPassword ? '👁️' : '🙈' }}
        </button>
        <span v-if="lozinkagreska" class="text-red-600">Lozinke se ne podudaraju!</span>
        <button @click="signup" class="border-1 rounded-lg bg-gray-700 w-s hover:bg-gray-500 p-1 mt-5">Sign Up</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { errorMessages } from 'vue/compiler-sfc';

    const username = ref("");
    const password = ref("");
    const passwordRepeat = ref("");
    const lozinkagreska = ref(false);

    // prikaz i skrivanje lozinke
    const showPassword = ref(false);
    function togglePassword() {
        showPassword.value = !showPassword.value;
    };

    // registracijski dio

    function signup(){
        if(password.value != passwordRepeat.value){
            lozinkagreska.value = true;
        }

        createUserWithEmailAndPassword(auth, username.value, password.value).then((userCredential) => {
            const user = userCredential.user;
            console.log("Uspjesna registracija", user);
        }).catch((error) => {
            const erroorCode = error.code;
            const errorMessages = error.message;
            console.error(erroorCode, errorMessages);
        })
    }
</script>