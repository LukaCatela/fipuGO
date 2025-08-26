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
        <p>Napisi nesto</p>
      </div>
    </div>
  </div>
</template>