<template>
  <div>
    <footer class="bg-gray-800 text-white py-8 px-4">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- O nama sekcija footera -->
        <div>
          <h3 class="font-bold mb-2">O nama</h3>
          <p class="text-sm">
            Aplikacija za pregled javnog prijevoza i korisničku registraciju.
          </p>
        </div>

        <!-- Brzi linkovi -->
        <div>
          <h3 class="font-bold mb-2">Brzi linkovi</h3>
          <ul class="text-sm space-y-1">
            <li><RouterLink to="/" class="hover:underline">Početna</RouterLink></li>
            <li><RouterLink to="/javniprijevoz" class="hover:underline">Javni prijevoz</RouterLink></li>
            <li><RouterLink to="/signup" class="hover:underline">Registracija</RouterLink></li>
          </ul>
        </div>

        <!-- Kontakt -->
        <div>
          <h3 class="font-bold mb-2">Kontakt</h3>
          <ul class="text-sm space-y-1">
            <li>Email: info@fipugo.hr</li>
            <li>Tel: +385 96 123 4567</li>
            <li>Adresa: Ul. Alda Negrija 6, 52100, Pula</li>
          </ul>
        </div>

      </div>

      <div class="text-center text-xs mt-6 border-t border-gray-600 pt-4">
        &copy; 2025 FipuGO
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
