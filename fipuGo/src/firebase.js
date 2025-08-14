// importamo potrebne module za firebase da funkcionira, morat ćemo dodat još i "Pinia store"(database)
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

// ubacuješ svoj ključ koji dobiješ kad kreiraš firebase projekt: apiKey,authDomain...
const firebaseConfig = {

};

// inicializiramo app i autentikaciju
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// exportamo da možemo koristit u drugim komponentama
export { app, auth };
