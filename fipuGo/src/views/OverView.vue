<template v-if="userRola==='admin'">
    Admin page
</template>

<script> // ako stavis setup onda nece radit export
import { ref, onMounted} from 'vue';
import { auth,db } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const userRola = ref(null);
//mogli smo i preko pinie ali lakše je direkt u firestore
// kad se app mounta onda provjerava ako ima usera

onMounted(()=>{
    //gleda svaku promjenu stanja auth
    onAuthStateChanged(auth, async(user)=>{
        if(user){
            const userSnap = await getDoc(doc(db, 'users', user.uid));

            if(userSnap.exists()){
                userRola.value = userSnap.data().rola;
                console.log("uloga: ", userRola.value);
            }else{
                console.log("Nema usera u firestoru")
            }
        }else{
            userRola.value=null;
        }
    });
});

export { userRola };
</script>