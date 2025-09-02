import { ref } from "vue";
import { defineStore } from "pinia";

// osim da pozivamo i gledamo u firestoru ako postoji user, možemo pomoću pinie spremit trenutnog usera
const useUserStore = defineStore('user', ()=>{
    const user = ref(null);

    function setUser(userData){
        user.value = { ...userData }; // ... -> to je spread operator koji kopira properties iz userData
    }


    function clearUser(){
        user.value = null;
    }
    return { user, setUser, clearUser };
});

export default useUserStore;
