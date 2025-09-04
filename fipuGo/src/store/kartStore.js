import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useKartStore = defineStore('kart', () => {
    const karte = [
      { vrsta: 'Dnevna', cijena: '7'},
      { vrsta: 'Tjedan', cijena: '27'},
      { vrsta: 'Mjesecna', cijena: '45'},
      { vrsta: 'Godisnja', cijena: '85'}]
    const count = ref({})
    const kosarica = ref([])
    const karta = ref({})

    karte.forEach(k => (count.value[k.vrsta] = 0))

    function plus(vrsta) {
    count.value[vrsta]++
    }

  function minus(vrsta) {
    if (count.value[vrsta] > 0) count.value[vrsta]--
    }

  function dodaj() {

    console.log("Dodaj clicked!")
    karte.forEach(k => {
      const trenutniBroj = count.value[k.vrsta]
      if (trenutniBroj === 0) return

      if (!karta.value[k.vrsta]) karta.value[k.vrsta] = 0
      karta.value[k.vrsta] += trenutniBroj

      for (let i = 0; i < trenutniBroj; i++) {
        kosarica.value.push({vrsta: k.vrsta, cijena: k.cijena})
        }

      count.value[k.vrsta] = 0
    })
    
  }

  function obrisiJednu(vrsta) {
    if (karta.value[vrsta] > 0){
      karta.value[vrsta]--
      const index = kosarica.value.findIndex(item => item.vrsta === vrsta)
      if(index !== -1) {
        kosarica.value.splice(index, 1)
      }
    }
    if (karta.value[vrsta] === 0){
      delete karta.value[vrsta]
    }
  }


  function obrisiSve(vrsta) {
    kosarica.value = kosarica.value.filter(item => item.vrsta !== vrsta)
    delete karta.value[vrsta]
  }
  return { karte, count, kosarica, karta, obrisiJednu, obrisiSve, plus, minus, dodaj }

})