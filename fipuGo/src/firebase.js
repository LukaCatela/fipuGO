// importamo potrebne module za firebase da funkcionira, morat ćemo dodat još i "Pinia store"(database)
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

// ubacuješ svoj ključ koji dobiješ kad kreiraš firebase projekt: apiKey,authDomain...
const firebaseConfig = {
  apiKey: "AIzaSyD5DtxEYaGMNaGrz55zjAa98XUL46yeld8",
  authDomain: "test-fipugo.firebaseapp.com",
  projectId: "test-fipugo",
  storageBucket: "test-fipugo.firebasestorage.app",
  messagingSenderId: "983942413539",
  appId: "1:983942413539:web:e5c35865f1481a757659d6"
};

// inicializiramo app i autentikaciju
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// exportamo da možemo koristit u drugim komponentama
export { app, auth };