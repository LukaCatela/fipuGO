// importamo potrebne module za firebase da funkcionira, morat ćemo dodat još i "Pinia store"(database)
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

// ubacuješ svoj ključ koji dobiješ kad kreiraš firebase projekt: apiKey,authDomain...
const firebaseConfig = {
  apiKey: "AIzaSyB49pvrxq26B2FvMdhgQkCAvUbJnYUc5xs",
  authDomain: "pi-fipugotest.firebaseapp.com",
  projectId: "pi-fipugotest",
  storageBucket: "pi-fipugotest.firebasestorage.app",
  messagingSenderId: "566208142513",
  appId: "1:566208142513:web:f79649a2e6fb4fd91d5690"

};

// inicializiramo app i autentikaciju
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// exportamo da možemo koristit u drugim komponentama
export { app, auth };
