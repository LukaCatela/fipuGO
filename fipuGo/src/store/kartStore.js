import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/firebase'
import { collection, doc, getDoc, deleteDoc, addDoc, onSnapshot, setDoc, updateDoc, serverTimestamp} from 'firebase/firestore'
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

    const userStore = useUserStore()
// uzimamo id user-a iz naseg pinia store-a
    function getUserID() {
      return userStore.user?.uid
    }

// 
    function karteColl() {
      const userID = getUserID()
      if (!userID) {
        return null
      }
      return collection(db, 'users', userID, 'karte')
    }

    karte.forEach(k => (count.value[k.vrsta] = 0))



// povecavanje broja karta prije kupnje
    function plus(vrsta) {
    count.value[vrsta]++
    }



// smanjivanje broja karta prije kupnje
  function minus(vrsta) {
    if (count.value[vrsta] > 0) count.value[vrsta]--
    }



// dodavanje karta u kosaricu
  async function dodaj() {
    const kolekcijakarta = karteColl()

    if (!kolekcijakarta){
     return console.log('user nije logiran')
    }
    console.log("Dodaj clicked!")
    for(const k of karte) {
      const trenutniBroj = count.value[k.vrsta]
      if (trenutniBroj === 0) continue

      const docRef = doc(kolekcijakarta, k.vrsta)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        await updateDoc(docRef, { kolicina: docSnap.data().kolicina + trenutniBroj })
      } else {
        await setDoc(docRef, { vrsta: k.vrsta, cijena: k.cijena, kolicina: trenutniBroj })
      }
      count.value[k.vrsta] = 0
    }
  }




// brisanje karta jednu po jednu
  async function obrisiJednu(vrsta) {

    const kolekcijakarta = karteColl()

    if(!kolekcijakarta || !karta.value[vrsta]){
      return
    }

    const docRef = doc(kolekcijakarta, vrsta)
    if (karta.value[vrsta] > 1){
      await updateDoc(docRef, { kolicina: karta.value[vrsta] - 1})
    }else{
      await deleteDoc(docRef)
    }
  }
  

// brisanje jedne skupine karta odjednom
  async function obrisiSve(vrsta) {
    const kolekcijakarta = karteColl()
    if(!kolekcijakarta || !karta.value[vrsta]){
      return
    }
    await deleteDoc(doc(kolekcijakarta, vrsta))
  }



//placanje karta kreira novu sub kolekciju u firestoru gdje su zapisani podatci o kupnji
  async function placanje(){
    const userID = getUserID()
    if(!userID) return console.log('user nije logiran')

    const useKarteColl = karteColl()
    if (!useKarteColl) return

  const ukupno = Object.entries(karta.value).reduce((suma, [vrsta, kolicina]) => {
        const cijena = karte.find(k => k.vrsta === vrsta)?.cijena || 0 
        return suma + cijena * kolicina
      }, 0)

    if (ukupno === 0)  return console.log('Kosarica je prazna')

    const kupovineColl = collection(db, 'users', userID, 'kupovine')
    await addDoc(kupovineColl, {
      items: kosarica.value.map(k => ({
        vrsta: k.vrsta,
        cijena: k.cijena,
        kolicina: k.kolicina
      })),
      ukupno,
      kreirano: serverTimestamp()
    })

    for(const k of karte){
      if(karta.value[k.vrsta]){
        await deleteDoc(doc(useKarteColl, k.vrsta))
      }
    }
  }


// funkcija koja prati kad je user ulogiran
  function pratiKosaricu() {
    const kolekcijakarta = karteColl()

    onSnapshot(kolekcijakarta, snapshot => {
      kosarica.value = []
      karta.value = {}

      snapshot.docs.forEach(docSnap =>{
        const data = docSnap.data()
        kosarica.value.push({ id: docSnap.id, ...data})
        karta.value[data.vrsta] = data.kolicina
      })
    })
  }

  pratiKosaricu()

  return { karte, count, kosarica, karta, obrisiJednu, obrisiSve, plus, minus, dodaj, pratiKosaricu, placanje }

})