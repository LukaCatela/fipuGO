// importamo potrebne module za firebase da funkcionira, morat ćemo dodat još i "Pinia store"(database)
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

// ubacuješ svoj ključ koji dobiješ kad kreiraš firebase projekt: apiKey,authDomain...
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID

};

// inicializiramo app i autentikaciju
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// exportamo da možemo koristit u drugim komponentama
export { app, auth };
