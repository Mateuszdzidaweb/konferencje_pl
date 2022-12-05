<template>


  <div class="flex justify-center py-2">
    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-5xl mt-5">
      <h1 class="text-gray-900 text-3xl leading-tight font-medium mb-2">{{conference.tytul}}</h1>
   <div class="flex flex-row py-2">
     <h3 class="flex justify-start text-2xl">Dyscyplina: </h3>
     <h3 class="flex flex-row justify-start text-2xl ml-2">{{ conference.dyscyplia}}</h3>
   </div>
      <div class="flex flex-row py-2">
        <h3 class="flex justify-start text-2xl">Miejscowosc: </h3>
        <h3 class="flex flex-row justify-start text-2xl ml-2">{{ conference.miejscowosc}}</h3>
      </div>
      <div class="flex flex-row py-2">
        <h3 class="flex justify-start text-2xl">Miejsce Konferenci: </h3>
        <h3 class="flex flex-row justify-start text-2xl ml-2">{{ conference.miejsce_konferencji}}</h3>
      </div>
      <div class="flex flex-row py-2">
        <h3 class="flex justify-start text-2xl">Data Konferenci: </h3>
        <h3 class="flex flex-row justify-start text-2xl ml-2">{{ conference.data_konferecnji}}</h3>
      </div>


      <p class="text-gray-700 text-left text-md mb-4 py-4">
        {{ conference.opis}}
      </p>
      <button @click="$router.back()" type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Back</button>
    </div>
  </div>


</template>

<script>
import firebase from  "firebase/compat/app";
let db = firebase.firestore();
export default {
  props:['kid'],
  data(){
    return{
      conference: '',
    }
  },
  methods: {
    getUserConference() {
          let docRef = db.collection('konferencje').doc(this.kid)
          docRef.get().then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              this.conference = doc.data();
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
    }
  },
  mounted() {
    this.getUserConference();
  }
}
</script>

<!--firebase.auth().onAuthStateChanged((user) => {-->
<!--if (user) {-->
<!--db.collection("konferencjeUzytkownika")-->
<!--.doc(user.uid)-->
<!--.collection("konferencje")-->
<!--.doc(this.kid)-->
<!--.onSnapshot((querySnapshot) => {-->
<!--this.userConferences = [];-->
<!--querySnapshot.forEach((doc) => {-->
<!--this.userConferences.push(doc.data());-->
<!--this.conferenceTitle = doc.data().conferenceTitle;-->

<!--});-->
<!--console.log('dsd');-->
<!--console.log('konferencje', this.userConferences);-->
<!--})-->
<!--}-->
<!--});-->