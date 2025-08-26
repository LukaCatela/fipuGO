<script setup>
import { ref, onMounted, watch } from 'vue';

//vasrijable
const vrijeme = ref(null);
const loading = ref(false);
const error = ref("");

const props = defineProps({
    grad:{
        required: true,
    }
        
})
const API_KEY = import.meta.env.VITE_WEATHER_API;

//asinkrona funkcija za dohvatit vrime u nekom gradu
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


console.log(new Date().getDate())
</script>
<template>
    <div class="p-4 bg-blue-50 rounded-xl shadow-md ">
        <p>Vrijeme za {{ props.grad }}</p>
        <div v-if="loading">Učitavanje...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else-if="vrijeme">
            <div v-for="(dan,i) in vrijeme.list.filter(el => el.dt_txt.includes('12:00:00'))" :key="i" class="mb-3 p-2 border rounded">
                <p>📅 {{ dan.dt_txt.split(' ')[0] }}</p>
                <p>🌡️ Temp: {{ dan.main.temp }}°C</p>
                <p>☁️ Vrijeme: {{ dan.list[0].weather[0].description }}</p>
                <p>💨 Vjetar: {{ dan.list[0].wind.speed }} m/s</p>
            </div>
        </div>

    </div>
</template>