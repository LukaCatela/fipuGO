<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-4">Kupljene Karte</h1>

    <div v-if="!karte || karte.length === 0" class="text-gray-500">
      Još niste kupili karte.
    </div>

    <ul v-else class="flex flex-col gap-4">
      <li v-for="(karta, index) in karte" :key="karta.KartaID || index" class="bg-blue-100 p-4 rounded-xl mt-5 flex justify-between items-center">
        
      <div class="flex flex-col">  
        <p class="font-bold">{{ karta.vrsta }}</p>
        <p>Cijena: {{ karta.cijena }}€</p>
      </div>
      <div>
        <img v-if="qrkodovi[karta.KartaID]" :src="qrkodovi[karta.KartaID]" class="w-[100px] h-[100px]"></img>
        <p v-else>Generiranje qrKoda...</p>
      </div>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, onMounted} from 'vue'
import { db } from '@/firebase'
import { collection, getDocs} from 'firebase/firestore'
import  {useUserStore }  from '@/store/user'
import QRCode from 'qrcode'



const userStore = useUserStore()
const karte = ref([])
const qrkodovi = ref({})

//koristimo ? kad nismo sigurni ako nesto 100% postoji vraca undefined umjesto error-a
async function kupljeneKarte() {
    const userID = userStore.user?.uid
    if(!userID){
        return
    }
    // kolekcija u koju funkcija placanje sprema kupljene karte
    const kolekcijaKarta = collection(db, 'users', userID, 'KupljeneKarte')
    const snapshot = await getDocs(kolekcijaKarta)

    // karta = jedan dokument
    karte.value = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    }))

    await Promise.all(
      karte.value.map(async (k)=> {
        if (k.KartaID) {
        qrkodovi.value[k.KartaID] = await QRCode.toDataURL(k.KartaID)
        }
      })
    )
      
    }

onMounted(() => {
    kupljeneKarte()
}) 
</script>