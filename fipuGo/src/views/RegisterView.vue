<template>
  <div class="flex flex-col items-center min-h-screen">
    <h1 class="text-3xl font-bold text-amber-400 mt-10 mb-6">Register</h1>

    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
      <input 
        type="text" 
        v-model="ime" 
        id="ime" 
        placeholder="Upiši ime" 
        class="w-full border rounded-lg mb-3 p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
      />
      <input 
        type="text" 
        v-model="prezime" 
        id="prezime" 
        placeholder="Upiši prezime" 
        class="w-full border rounded-lg mb-3 p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
      />
      <input 
        type="email" 
        v-model="username" 
        placeholder="Upiši email" 
        id="email" 
        class="w-full border rounded-lg mb-3 p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
      />
      <input 
        :type="showPassword ? 'text':'password'"  
        v-model="password" 
        placeholder="Upiši lozinku" 
        id="lozinka" 
        class="w-full border rounded-lg mb-3 p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
      />
      <input 
        :type="showPassword ? 'text':'password'" 
        v-model="passwordRepeat" 
        placeholder="Ponovno upiši lozinku" 
        id="lozinka_potvrda" 
        class="w-full border rounded-lg mb-3 p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
      />

      <button 
        type="button" 
        @click="togglePassword" 
        class="text-gray-500 text-sm mb-3 hover:text-amber-400 transition">
        {{ showPassword ? '👁️ Sakrij lozinke' : '🙈 Prikaži lozinke' }}
      </button>

      <span 
        v-if="lozinkagreska && password!=passwordRepeat" 
        class="text-red-600 mb-3">
        Lozinke se ne podudaraju!
      </span>

      <div class="flex space-x-4 mt-4 w-full">
        <button 
          @click="signup" 
          :disabled="!password || !passwordRepeat || password !== passwordRepeat" 
          class="flex-1 flex items-center justify-center gap-2 border rounded-lg bg-amber-400 text-white font-semibold py-2 px-4 hover:bg-amber-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition">
          Sign Up
        </button>

        <button 
          @click="googleSignup" 
          class="flex-1 flex items-center justify-center gap-2 border rounded-lg bg-white text-amber-400 font-semibold py-2 px-4 shadow hover:bg-gray-100 transition">
          <img src="/googleicon.ico" alt="Google Icon" class="w-5 h-5" />
          Sign up with Google
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import useUserStore from '@/store/user';
import { doc, setDoc, getDoc } from 'firebase/firestore';
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

    // obična registracija putem emaila
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

    // registracija pomocu google auth

    const provider = new GoogleAuthProvider();
    const googleSignup = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // moramo provjeriti ako postoji u firestore-u
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
            const userData = {
                ime: user.displayName?.split(" ")[0] || "",
                prezime: user.displayName?.split(" ")[1] || "",
                email: user.email,
                rola: "korisnik",
                uid: user.uid,
                };

            await setDoc(docRef, userData);
            userStore.setUser(userData);

            }else{
                userStore.setUser(docSnap.data());
            }
            router.push("/home");
        }catch (error){
            console.error("Google signup error: ", error)
        }    
    };
    

</script>

