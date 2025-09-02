# fipuGo
## Opis
FipuGO je web aplikacija za pregled javnog prijevoza i upravljanje kartama.
Omogućuje korisnicima prijavu preko emaila ili Google računa, a administratori imaju dodatne funkcionalnosti poput pregleda svih korisnika.

Aplikacija koristi Firebase Authentication za prijavu i registraciju korisnika te Firestore za pohranu korisničkih podataka, uključujući ime, prezime, email....

Korisnik bez logiranja može pregledati vozni red te interaktivnu kartu javnog gradskog prijevoza, a ako se ulogira može kupovat karte.


### Za izradu projekta smo koristili:
Vue 3 – frontend framework

Pinia – state management

Vue Router – navigacija između stranica

Tailwind CSS – still

Firebase Auth – autentikacija korisnika (email/password i Google auth)

Firebase Firestore – pohrana korisničkih podataka

Maplibre-gl - interaktivna web karta
## Project Setup

```sh
git clone
cd fipuGo
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
app ce se otvoriti na [localhost](http://localhost:5173)
