import { ref } from "vue";
import { defineStore } from "pinia";

const useUserStore = defineStore('user', ()=>{
    const user = ref(null);


    function setUser(userData){
        user.value = { ...userData }; // ... -> to je spread operator koristi se kao alat za raspakiranje objakta, brži i jednostavniji način za dodjelivanje nekih info objekta. Šegi ako ne kužiš pitaj Gepeta.
    }

    function clearUser(){
        user.value = null;
    }
    return { user, setUser, clearUser };
});

export default useUserStore;
