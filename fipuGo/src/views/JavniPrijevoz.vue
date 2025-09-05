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
      <!--Meteo api call-->
      <Vrijeme :grad="odabranGrad"/>
    </div>
    <div class="flex gap-4 ">
      <div class="flex-1 p-2 h-[500px] m-3 bg-blue-50 rounded-xl shadow-md">
        <component :is="currentComponent" />
      </div>
      <div class="flex-1 p-4 m-3 bg-blue-50 rounded-xl shadow-md">
        <div v-if="odabranGrad==='Pula'" class="space-y-2">
          <h3 class="text-lg font-bold text-blue-700">🚍 Gradske linije - Pula (Zona 1)</h3>
          <ul class="list-disc list-inside space-y-1">
            <li><b>1</b> Bus kolodvor ↔ Stoja ↔ Bus kolodvor</li>
            <li><b>2a</b> Bus kolodvor ↔ Veruda ↔ Vidikovac ↔ Šijana</li>
            <li><b>3a</b> Šijana ↔ Vidikovac ↔ Verudela ↔ Bus kolodvor</li>
            <li><b>4</b> Veli Vrh ↔ Stoja ↔ Valkane ↔ Veruda ↔ Veli Vrh</li>
            <li><b>5a</b> Giardini ↔ Štinjan ↔ Giardini</li>
            <li><b>6</b> Jadreški ↔ Kaštanjer ↔ Veruda ↔ Stoja ↔ Kaštanjer ↔ Jadreški</li>
            <li><b>8</b> Bus kolodvor ↔ Monte Magno ↔ Valdebek ↔ Bus kolodvor</li>
            <li><b>9</b> Bus kolodvor ↔ Monte Serpo ↔ Valmade ↔ Bus kolodvor</li>
            <li><b>71</b> Centar ↔ Šijana ↔ Gregovica ↔ Giardini ↔ Stoja ↔ Valkane ↔ Veruda ↔ Verudela ↔ Vidikovac ↔ Centar</li>
            <li><b>72</b> Centar ↔ Partizanski put ↔ Veli Vrh ↔ Štinjan ↔ Veli Vrh ↔ Centar</li>
            <li><b>73</b> Bus kolodvor ↔ Monte Magno ↔ Valdebek ↔ Busoler ↔ Centar ↔ Bus kolodvor</li>
          </ul>
        </div>

        <div v-else-if="odabranGrad==='Zagreb'" class="space-y-2">
          <h3 class="text-lg font-bold text-green-700">🚋 Tramvajske linije - Zagreb</h3>
          <ul class="list-disc list-inside space-y-1">
            <li><b>1</b> Zapadni kolodvor ↔ Borongaj</li>
            <li><b>2</b> Črnomerec ↔ Savišće</li>
            <li><b>3</b> Ljubljanica ↔ Savišće</li>
            <li><b>4</b> Savski most ↔ Dubec</li>
            <li><b>5</b> Prečko ↔ Dubrava</li>
            <li><b>6</b> Črnomerec ↔ Sopot</li>
            <li><b>7</b> Savski most ↔ Dubec</li>
            <li><b>8</b> Mihaljevac ↔ Zapruđe</li>
            <li><b>11</b> Črnomerec ↔ Dubec</li>
            <li><b>12</b> Ljubljanica ↔ Dubrava</li>
            <li><b>14</b> Mihaljevac ↔ Zapruđe</li>
            <li><b>17</b> Prečko ↔ Borongaj</li>
          </ul>
      </div>

        
      </div>
    </div>
  </div>
</template>