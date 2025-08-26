<script setup>
import { ref, computed } from 'vue'
import Mapa_zg from '@/components/Mapa_zg.vue';
import Mapa_pu from '@/components/Mapa_pu.vue';
import Vrijeme from '@/components/Vrijeme.vue';

const odabranGrad = ref('Pula') // default-no prikaz Pule

const currentComponent = computed(() => {
  switch (odabranGrad.value){
    case 'Zagreb':
      return Mapa_zg
    case 'Pula':
      return Mapa_pu
  }
});
</script>

<template>
  <div class="p-4">
    <select class="border-1 rounded-md p-1 bg-blue-100 font-bold" v-model="odabranGrad">
        <option value="Pula">Pula</option>
        <option value="Zagreb">Zagreb</option>
    </select>
    <div>
      <!--WEATHER API CALL-->
      <Vrijeme :grad="odabranGrad"/>
    </div>
    <div class="flex gap-4 ">
      <div class="flex-1 p-2 h-[500px] m-3 bg-blue-50 rounded-xl shadow-md">
        <component :is="currentComponent" />
      </div>
      <div class="flex-1 p-4 m-3 bg-blue-50 rounded-xl shadow-md">
        <div v-if="odabranGrad==='Pula'">
          GRADSKE LINIJE / LINEE URBANE / URBAN LINES - ZONA 1
          <p><b>1</b> Bus kolodvor → Stoja → Bus kolodvor</p>
          <p><b>2a</b> Bus kolodvor → Veruda → Vidikovac → Šijana</p>
          <p><b>3a</b> Šijana → Vidikovac → Verudela → Bus kolodvor</p>
          <p><b>4</b> Veli Vrh → Stoja → Valkane → Veruda → Veli Vrh</p>
          <p><b>5a</b> Giardini → Štinjan → Giardini</p>
          <p><b>6</b> Jadreški → Kaštanjer → Veruda → Stoja → Kaštanjer → Jadreški</p>
          <p><b>8</b> Bus kolodvor → Monte Magno → Valdebek → Bus kolodvor</p>
          <p><b>9</b> Bus kolodvor → Monte Serpo → Valmade → Bus kolodvor</p>
          <p><b>71</b> Centar → Šijana → Gregovica → Giardini → Stoja →Valkane
          → Veruda → Verudela → Vidikovac → Centar</p>
          <p><b>72</b> Centar → Partizanski put → Veli Vrh → Štinjan → Veli Vrh → Centar</p>
          <p><b>73</b> Bus kolodvor → Monte Magno → Valdebek → Busoler
          → Centar → Bus Kolodvor</p>
        </div>
        <div v-else="odabranGrad==='Zagreb'">
          Nešto
        </div>
        
      </div>
    </div>
  </div>
</template>