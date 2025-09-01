import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useKartStore = defineStore('kart', () => {
    const karte = ['Dnevna', 'Tjedna', 'Mjesecna', 'Godisnja']
    const count = ref({})
    const kosarica = ref([])
    const karta = ref({})

    karte.forEach(vrsta => count.value[vrsta] = 0)

    function plus(vrsta) {
    count.value[vrsta]++
    }

  function minus(vrsta) {
    if (count.value[vrsta] > 0) count.value[vrsta]--
    }

  function dodaj() {

    console.log("Dodaj clicked!")
    karte.forEach(vrsta => {
      const trenutniBroj = count.value[vrsta]
      if (trenutniBroj === 0) return

      if (!karta.value[vrsta]) karta.value[vrsta] = 0
      karta.value[vrsta] += trenutniBroj

      for (let i = 0; i < trenutniBroj; i++) {
        kosarica.value.push(vrsta)
        }

      count.value[vrsta] = 0
    })
    
  }

  return { karte, count, kosarica, karta, plus, minus, dodaj }

})