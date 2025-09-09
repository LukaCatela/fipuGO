<template>
  <div>
    <h1 class="text-2xl font-bold m-4">Admin Page</h1>
    
    
    <div>

      <table class="min-w-full bg-amber-100 border rounded-lg">
        <thead>
          <tr>
            <th class="border px-4 py-2">Ime</th>
            <th class="border px-4 py-2">Prezime</th>
            <th class="border px-4 py-2">Email</th>
            <th class="border px-4 py-2">Rola</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="border px-4 py-2">{{ user.ime }}</td>
            <td class="border px-4 py-2">{{ user.prezime }}</td>
            <td class="border px-4 py-2">{{ user.email }}</td>
            <td class="border px-4 py-2">{{ user.rola }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth, db } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const userRola = ref(null);
const users = ref([]);

onMounted(() => {
  // prati login/logout
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userSnap = await getDoc(doc(db, 'users', user.uid));
      if (userSnap.exists()) {
        userRola.value = userSnap.data().rola;
        console.log("Uloga:", userRola.value);

        // ako je admin, povuci sve korisnike iz firestore-a
        if (userRola.value === 'admin') {
            //povuci cijelu kolekciju 'users'
          const querySnapshot = await getDocs(collection(db, "users"));
          //mapiraj podatke za svakog usera
          users.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } else {
        console.log("Korisnik ne postoji u Firestore-u");
      }
    } else {
      userRola.value = null;
      users.value = [];
    }
  });
});
</script>
