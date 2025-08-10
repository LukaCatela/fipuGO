<script setup>
import { ref, computed } from 'vue'
import Mapa_zg from '@/components/Mapa_zg.vue';
import Mapa_pu from '@/components/Mapa_pu.vue';

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
  <div>
    <select class="border-1 rounded-md p-1 bg-blue-200" v-model="odabranGrad">
        <option value="Pula">Pula</option>
        <option value="Zagreb">Zagreb</option>
    </select>
    <component :is="currentComponent" />
  </div>
</template>