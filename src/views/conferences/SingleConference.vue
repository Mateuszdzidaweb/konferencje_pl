<template>


  <div class="flex justify-center py-2">

    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-5xl mt-5">
      <div class="flex justify-end">
        <button v-if="isFavorite === true"  v-on:click="removeFromFavorites(kid)"  class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-bold text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500  dark:text-black">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500  dark:text-white  rounded-md group-hover:bg-opacity-0">
           Usuń z ulubionych
          </span>
        </button>
        <button   v-if="isFavorite === false" v-on:click="addToFavorites(kid)" class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-black rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0">
       Dodaj do ulubionych
  </span>
        </button>
      </div>

      <h1 class="text-gray-900 text-3xl leading-tight font-medium mb-2">{{conference.tytul}}</h1>
   <div class="flex flex-row py-2">
     <h3 class="flex justify-start text-2xl">Dyscyplina: </h3>
     <h3 class="flex flex-row justify-start text-2xl ml-2">{{ conference.dyscyplia}}</h3>
   </div>
      <div class="flex flex-row py-2">
        <h3 class="flex justify-start text-2xl">Miejscowość: </h3>
        <h3 class="flex flex-row justify-start text-2xl ml-2">{{ conference.miejscowosc}}</h3>
      </div>
      <div class="flex flex-row py-2">
        <h3 class="flex justify-start text-2xl">Miejsce Konferenci: </h3>
        <h3 class="flex flex-row justify-start text-2xl ml-2">{{ conference.miejsce_konferencji}}</h3>
      </div>
      <div class="flex flex-row py-2">
        <h3 class="flex justify-start text-2xl">Data Rozpoczecia Konferenci: </h3>
        <h3 class="flex flex-row justify-start text-2xl ml-2">{{ conference.data_konferecnji}}</h3>
      </div>
      <div class="flex flex-row py-2">
        <h3 class="flex justify-start text-2xl">Organizator: </h3>
        <h3 class="flex flex-row justify-start text-2xl ml-2">{{ conference.organizator}}</h3>
      </div>
      <div class="flex flex-row py-2">
        <h3 class="flex justify-start text-2xl">Kontakt: </h3>
        <h3 class="flex flex-row justify-start text-2xl ml-2">{{ conference.kontakt}}</h3>
      </div>


      <p class="text-gray-700 text-left text-md mb-4 py-4">
        {{ conference.opis}}
      </p>
      <button @click="$router.back()" type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Wróć</button>
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
      favorite_conference_id: '',
      isFavorite: false
    }
  },
  methods: {
    getUserConference() {
          let docRef = db.collection('konferencje').doc(this.kid)
          docRef.get().then((doc) => {
            if (doc.exists) {
              this.conference = doc.data();
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
    },
    addToFavorites(conference_id) {
      firebase.auth().onAuthStateChanged((user) => {
        this.currentUserID = user.uid;
        db.collection('userProfile')
            .doc(user.uid)
            .update({
              favorites: firebase.firestore.FieldValue.arrayUnion(conference_id)
              // isFavorite: false
            })
      });
    },
    removeFromFavorites(conference_id){
      firebase.auth().onAuthStateChanged((user) => {
        this.currentUserID = user.uid;
        db.collection('userProfile')
            .doc(user.uid)
            .update({
              favorites: firebase.firestore.FieldValue.arrayRemove(conference_id)
            })
       this.checkUserFavorite();
        console.log('Added to array', conference_id);
      });
    },
    checkUserFavorite(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("userProfile")
              .doc(user.uid)
              .onSnapshot((doc) => {
                this.userFavorite = doc.data().favorites;
                console.log('user favorite conferences: ', this.userFavorite)
                console.log('user conferences: ', this.kid)

                if(this.userFavorite.includes(this.kid)){
                  this.isFavorite = true
                  // this.userConferences.push(doc.data());
                  console.log('is favorite ',  this.isFavorite , 'conference id ',  this.kid)
                }else{
                  this.isFavorite = false;
                  console.log('is not favorite ',  this.isFavorite , 'conference id ', this.kid)
                }
              })
        }

      })
    }
  },
  beforeMount(){
    this.checkUserFavorite();
  },
  mounted() {
    this.getUserConference();
  }
}
</script>
