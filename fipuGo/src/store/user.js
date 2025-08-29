import { ref } from "vue";
import { defineStore } from "pinia";

const useUserStore = defineStore('user', ()=>{
    const user = ref({
        ime: "",
        prezime: "",
        role: "user",
        email: "",
        uid: "",
    });


    function setUser(userData){
        user.value = { ...user.value, ...userData }; // ... -> to je spread operator koristi se kao alat za raspakiranje objakta, brži i jednostavniji način za dodjelivanje nekih info objekta. Šegi ako ne kužiš pitaj Gepeta.
    }

    function clearUser(){
        user.value = {
            uid: null,
            ime: "",
            prezime: "",
            email: "",
            adresa: "",
            rola: "user",
            };
    }
    return { user, setUser, clearUser };
});

export default useUserStore;
