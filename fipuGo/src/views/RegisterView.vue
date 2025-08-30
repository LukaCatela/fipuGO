<template>
    <h1 class="flex flex-col justify-center items-center my-5"><b>Register</b></h1>
    <div class="flex flex-col justify-center items-center my-5">
        <input type="text" v-model="ime" id="ime" placeholder="Upisi ime" class="border-1 rounded-lg mb-3 p-1">
        <input type="text" v-model="prezime" id="prezime" placeholder="Upisi prezime" class="border-1 rounded-lg mb-3 p-1">
        <input type="email" v-model="username" placeholder="Upisi email" id="email" class="border-1 rounded-lg p-1 mb-3">
        <input :type="showPassword ? 'text':'password'"  v-model="password" placeholder="Upisi lozinku" id="lozinka" class="border-1 rounded-lg mb-3 p-1">
        <input :type="showPassword ? 'text':'password'" v-model="passwordRepeat" placeholder="Ponovno upisi lozinku" id="lozinka_potvrda" class="border-1 rounded-lg p-1">
        <button type="button" @click="togglePassword">
            {{ showPassword ? '👁️' : '🙈' }}
        </button>
        <span v-if="lozinkagreska && password!=passwordRepeat" class="text-red-600">Lozinke se ne podudaraju!</span>
        <button @click="signup" :disabled="!password || !passwordRepeat || password !== passwordRepeat" class="border-1 rounded-lg bg-gray-700 w-s hover:bg-gray-500 p-1 mt-5
         disabled:bg-gray-400 disabled:cursor-not-allowed">Sign Up</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useUserStore from '@/store/user';
import { doc, setDoc } from 'firebase/firestore';
import router from '@/router';

    const userStore = useUserStore();

    const ime = ref("");
    const prezime = ref("");
    const username = ref("");
    const password = ref("");
    const passwordRepeat = ref("");
    const lozinkagreska = ref({ error: false, message: '' });


    // prikaz i skrivanje lozinke
    const showPassword = ref(false);
    function togglePassword() {
        showPassword.value = !showPassword.value;
    };

    // registracijski dio stari način i novi
    /*
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
    }*/
    const signup = async () =>{
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, username.value, password.value);
            const uid = userCredential.user.uid;
            console.log(uid);

            //kreiramo novi dokument u kolekciji users (to ti je baza na firestoru)
            const userData = {
                ime: ime.value,
                prezime: prezime.value,
                email: username.value,
                rola: 'korisnik', //defaultna uloga
                uid: uid,
            };

            await setDoc(doc(db, "users", uid), userData); //tražimo prvo kolekciju users u db, i pod uid spremamo podatke.

            //spremamo podatke i u piniu
            userStore.setUser(userData);
            lozinkagreska.value.error = false;
            lozinkagreska.value.message = 'Korisnik registriran' + JSON.stringify(userCredential);
            router.push("/home");
        } catch (error) {
            lozinkagreska.value.error = true;
            lozinkagreska.value.message = 'Greška pri registraciji'
        }    
    };

</script>

