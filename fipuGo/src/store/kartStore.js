import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/firebase'
import { collection, doc, addDoc, deleteDoc, onSnapshot} from 'firebase/firestore'
import  useUserStore  from '@/store/user'



export const useKartStore = defineStore('kart', () => {
    const karte = [
      { vrsta: 'Dnevna', cijena: '7'},
      { vrsta: 'Tjedan', cijena: '27'},
      { vrsta: 'Mjesecna', cijena: '45'},
      { vrsta: 'Godisnja', cijena: '85'}]

    const count = ref({})
    const kosarica = ref([])
    const karta = ref({})


    function getUserID() {
      const userStore = useUserStore()
      return userStore.user?.uid
    }

    function karteColl() {
      const userID = getUserID()
      if (!userID) throw new Error('User nije logiran')
      return collection(db, 'users', userID, 'karte')
    }

    karte.forEach(k => (count.value[k.vrsta] = 0))


    function plus(vrsta) {
    count.value[vrsta]++
    }

  function minus(vrsta) {
    if (count.value[vrsta] > 0) count.value[vrsta]--
    }

  async function dodaj() {
    const kolekcijakarta = karteColl()

    console.log("Dodaj clicked!")
    for(const k of karte) {
      const trenutniBroj = count.value[k.vrsta]
      if (trenutniBroj === 0) continue
    
      for (let i = 0; i < trenutniBroj; i++) {
          await addDoc(kolekcijakarta, { vrsta: k.vrsta, cijena: k.cijena })
        }
      
      count.value[k.vrsta] = 0
    }
  }

  async function obrisiJednu(vrsta) {

    const kolekcijakarta = karteColl()
      const index = kosarica.value.findIndex(item => item.vrsta === vrsta)
      if(index === -1) {
        return
      }
    
    const item = kosarica.value[index]

    await deleteDoc(doc(kolekcijakarta, item.id))

    karta.value[vrsta] = (karta.value[vrsta] || 1) -1
    if (karta.value[vrsta] <= 0) {
      delete karta.value[vrsta]
    }
    kosarica.value.splice(index, 1)
  }
  


  async function obrisiSve(vrsta) {
    const kolekcijakarta = karteColl()
    const items = kosarica.value.filter(item => item.vrsta === vrsta)
    for (const item of items){
      await deleteDoc(doc(kolekcijakarta, item.id))
    }
    
    kosarica.value = kosarica.value.filter(item => item.vrsta !== vrsta)
    delete karta.value[vrsta]
  }

  function pratiKosaricu() {
    const kolekcijakarta = karteColl()
    onSnapshot(kolekcijakarta, snapshot => {
      kosarica.value = []
      karta.value = {}
      snapshot.docs.forEach(docSnap =>{
        const data = docSnap.data()
        kosarica.value.push({ id: docSnap.id, ...data})
        karta.value[data.vrsta] = (karta.value[data.vrsta] || 0) +1
      })
    })
  }

  pratiKosaricu()

  return { karte, count, kosarica, karta, obrisiJednu, obrisiSve, plus, minus, dodaj, pratiKosaricu }

})