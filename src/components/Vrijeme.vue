<script setup>
import { ref, onMounted, watch } from 'vue';

//vasrijable
const vrijeme = ref(null);
const loading = ref(false);
const error = ref("");

const props = defineProps({
    grad:{
        type: String,
        required: true,
    }
        
})
const API_KEY = import.meta.env.VITE_WEATHER_API;

//asinkrona funkcija za dohvatit vrime/meteo u nekom gradu
async function dohvatiVrime() {
    try{
        loading.value=true;
        error.value="";
        const rezultat = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${props.grad}&appid=${API_KEY}&units=metric&lang=hr`
        );
        if(!rezultat.ok) throw new Error('Greška pri dohvaćanju podataka');
        const podaci_vrime = await rezultat.json();
        vrijeme.value = podaci_vrime;
    }catch(error){
        error.value = error.message;
    }finally{
        loading.value = false;
    }
};

// kad se komponenta montira
onMounted(()=>{
    dohvatiVrime();
});

//ova watch funkcija nam služi da kad se promijeni grad da se ažurira vrime
watch(()=>props.grad,()=>{
    dohvatiVrime()
})

// formatiranje datuma 

const formatirajDatum = (datumString) =>{
    const dani_u_tjednu = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota']; // američki zapis tjedna
    try{
        const datum = new Date(datumString);
        const imeDana = dani_u_tjednu[datum.getDay()];
        const dan = datum.getDate();
        const mjesec = datum.getMonth()+1;
        const godina = datum.getFullYear();
        return `${imeDana}, ${dan}.${mjesec}.${godina}.`;
    }catch(e){
        console.error("Greška u formatiranju datuma:", e);
        return datumString.split(' ')[0];
    }
};
</script>
<template>
    <div class="p-4 m-3 bg-blue-50 rounded-xl shadow-md">
        <p class="text-lg font-semibold">Vremenska prognoza za {{ props.grad }}</p>
        <p class="text-xs mb-2">by OpenWeather</p>
        
        <div v-if="loading">Učitavanje...</div>
        
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else-if="vrijeme" class="flex flex-wrap gap-4">
            <div 
              v-for="(dan, i) in vrijeme.list.filter(el => el.dt_txt.includes('12:00:00'))" 
              :key="i" 
              class="flex-1 min-w-[180px] p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <p class="font-bold text-gray-700">{{ formatirajDatum(dan.dt_txt) }}</p>
                <p v-if="Math.round(dan.main.temp)>23"> 🔥 Temp: {{ Math.round(dan.main.temp) }}°C</p>
                <p v-else>❄️ Temp: {{ Math.round(dan.main.temp) }}°C</p>
                <div class="flex flex-row items-center">
                    <img :src="`https://openweathermap.org/img/wn/${dan.weather[0].icon}@2x.png`" :alt="dan.weather[0].description" class="w-10 h-10"/>
                    <p class="capitalize">{{ dan.weather[0].description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>