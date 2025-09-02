<template>
  <div class="flex flex-col justify-top items-center min-h-screen">
    <h1 class="text-3xl font-bold text-amber-400 mt-10 mb-4">Log In</h1>
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
      <input 
        type="email" 
        v-model="username" 
        placeholder="Upiši email" 
        id="email" 
        class="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-amber-400 focus:outline-none"
      />
      <input 
        type="password" 
        v-model="password" 
        placeholder="Upiši lozinku" 
        id="lozinka" 
        class="w-full border rounded-lg p-2 mb-6 focus:ring-2 focus:ring-amber-400 focus:outline-none"
      />

      <div class="flex flex-col gap-3 w-full">
        <button 
          @click="ulogiraj" 
          class="flex items-center justify-center gap-2 border rounded-lg bg-amber-400 text-white font-semibold py-2 px-4 shadow hover:bg-amber-500 transition">
          Log in
        </button>
        <button 
          @click="loginGoogle" 
          class="flex items-center justify-center gap-2 border rounded-lg bg-white text-amber-400 font-semibold py-2 px-4 shadow hover:bg-gray-100 transition">
          <img src="/googleicon.ico" alt="Google Icon" class="w-5 h-5" />
          Google login
        </button>
      </div>

      <span 
        class="mt-4 text-sm text-center" 
        :class="response.error ? 'text-rose-600' : 'text-emerald-600'">
        {{ response.message }}
      </span>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
// login sa emailom
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

//login sa google-om
const provider = new GoogleAuthProvider();

const loginGoogle = async () => {
    try{
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        let token = credential ? credential.accessToken : null; // koristimo terminaln da ne pišemo if, jer nekepute more biti i null
        const user = result.user;

        router.push("/home");
        console.log(token); 
        console.log(user);
    }catch(error){
        console.error("Došlo je do greške: ", error);
    }
}
</script>