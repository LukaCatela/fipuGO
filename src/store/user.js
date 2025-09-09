import { ref } from "vue";
import { defineStore } from "pinia";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc,getDoc, setDoc } from "firebase/firestore";

// osim da pozivamo i gledamo u firestoru ako postoji user, možemo pomoću pinie spremit trenutnog usera
export const useUserStore = defineStore('user', ()=>{
    const user = ref(null);
    const ucitavanje = ref(true);

    async function fetchUserData(firebaseKorisnik) {
        if(!firebaseKorisnik){
            clearUser();
            return;
        }
        
        const userRef = doc(db, 'users', firebaseKorisnik.uid);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
            setUser(docSnap.data());
        } else {
            // kreiraj novi dokument ako user ne postoji u Firestore
            const newUser = {
                ime: firebaseKorisnik.displayName?.split(" ")[0] || "",
                prezime: firebaseKorisnik.displayName?.split(" ")[1] || "",
                email: firebaseKorisnik.email,
                rola: "korisnik",
                uid: firebaseKorisnik.uid,
            };
            await setDoc(userRef, newUser);
            setUser(newUser);
        }
    }

    function setUser(userData){
        user.value = { ...userData }; // ... -> to je spread operator koji kopira properties iz userData
    }


    function clearUser(){
        user.value = null;
    }

    onAuthStateChanged(auth, async (firebaseKorisnik) => {
    ucitavanje.value = true;
    await fetchUserData(firebaseKorisnik);
    ucitavanje.value = false;
    });

    return { user, setUser, clearUser };
});


