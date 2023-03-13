<template>
  <div v-if="userConferences">
    <div>
      <!--      <h1 @click="getBiologia">{{ biologia }}</h1>-->
      <div class="flex flex-row justify-center py-5 flex-wrap">
        <button
            id="btnFilter"
            class="p-2 mt-2 ml-2 mr-2 pl-5 pr-5 bg-transparent border-2 border-indigo-500 text-indigo-500 text-lg rounded-lg transition-colors duration-700 transform hover:bg-indigo-500 hover:text-gray-100 focus:border-4 focus:border-indigo-300 focus:bg-indigo-500 focus:text-gray-100"
            @click="getDyscypliny(dyscyplina.tytul)"  v-for="dyscyplina in dyscypliny" :key="dyscyplina.tytul" :class="dyscyplina.tytul">
          {{ dyscyplina.tytul }}
        </button>
      </div>
    </div>

    <span v-if="userConferences.length === 0"  class="text-xl">Nie ma konferecni o tej dyscyplinie</span>

    <!-- component -->
    <!-- This is an example component -->
    <div class="w-3/4 m-auto mt-5 mb-5"  v-for="userConference in userConferences" v-bind:key="userConference.id">

      <div class="flex flex-col border rounded-lg overflow-hidden bg-white">
        <div class="grid grid-cols-1 sm:grid-cols-4">
          <div class="flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center">
            <p class="text-2xl font-bold text-[#0ed3cf] rounded-full">{{ userConference.tytul }}</p>
          </div>
          <div class="flex flex-col sm:border-l col-span-3">
            <div class="flex flex-col space-y-4  p-6 text-gray-600">

<!--              <div v-if="currentUserID" v-on:click="addToFavorites(userConference.kid)">-->
<!--                <h1>Add to favorites</h1>-->
<!--              </div>-->

              <div class="flex flex-row text-sm">
                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Tytuł:</span>
                  <span class="text-xl">{{ userConference.tytul }}</span>
                </p>
              </div>
              <div class="flex flex-row text-sm">
                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Dyscyplina:</span>
                  <span class="text-xl">{{ userConference.dyscyplia }}</span>
                </p>
              </div>

              <div class="flex flex-row text-sm">
                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Miejsce Konferencji:</span>
                  <span class="text-xl">{{ userConference.miejsce_konferencji }}</span>
                </p>
              </div>
              <div class="flex flex-row text-sm">
                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Miejscowość</span>
                  <span class="text-xl">{{ userConference.miejscowosc }}</span>
                </p>
              </div>

              <div class="flex flex-row text-sm">
                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Organizator</span>
                  <span class="text-xl">{{ userConference.organizator }}</span>
                </p>
              </div>
              <div class="flex flex-row text-sm">
                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Kontakt</span>
                  <span class="text-xl">{{ userConference.kontakt }}</span>
                </p>
              </div>

            </div>
            <div class="flex flex-col w-full relative bottom-0">

            </div>
          </div>
        </div>

        <div class="flex flex-col border rounded-lg overflow-hidden bg-white  w-full">
          <div class="grid grid-cols-1">
            <div class="flex flex-col">
              <div class="flex flex-col space-y-4  p-6 text-gray-600">
                <div class="flex flex-row text-sm">
                  <p class="flex items-center text-left text-gray-500">
                    {{ userConference.opis.substring(0,350)+".." }}
                  </p>
                </div>
              </div>
<!--              v-if="userConference.kuid === user_uid"-->
              <div class="flex flex-col w-full relative bottom-0">
                <div
                    class="grid grid-cols-3 border-t divide-x text-gray-500  bg-gray-50 dark:bg-transparent py-3">
                  <a v-if="currentUserID === userConference.kuid "
                      class=" cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                    <div class="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px"
                           viewBox="0 0 24 24" width="20px" fill="#64748b">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </div>
                    Edytuj
                  </a>
                  <a v-if="currentUserID === userConference.kuid "  v-on:click="removeConference(userConference.kid)"
                      class="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                    <div class="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px"
                           viewBox="0 0 24 24" width="20px" fill="#64748b">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </div>
                    Usuń
                  </a>
                  <router-link :to="{ name: 'SingleConference', params: { kid: userConference.kid } }"
                               class="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                    <div class="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px"
                           viewBox="0 0 24 24" width="20px" fill="#64748b">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                      </svg>
                    </div>
                    Zobacz szczegóły

                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseConfig from '../components/firebaseConfig';
firebase.initializeApp(firebaseConfig);

import firebase from  "firebase/compat/app";
import 'firebase/compat/firestore';
let db = firebase.firestore();
export default {
  name: 'HomeView',
  data: function () {
    return {
      btnID:'',
      isActive: false,
      userConferences: 0,
      conferenceTitle: '',
      userId: '',
      conferenceKuid: '',
      currentUserID: '',
      userName: '',
      conferenceFilter: [],
      user_id: '',
      favorite_conference_id: [],
      favorite_doc_id: '',
      favorite_doc_exist: null,
      dyscypliny: [
        { tytul: 'Wszystkie' },
        { tytul: 'Biologia' },
        { tytul: 'Filozofia' },
        { tytul: 'Finanse' },
        { tytul: 'Farmacja' },
        { tytul: 'Ekologia' },
        { tytul: 'Psychologia' },
        { tytul: 'Fizyka' },
        { tytul: 'Ekonomia' },

      ],
    };
  },
  methods:{
    getAllConferences(){
          db.collection("konferencje")
              .onSnapshot((querySnapshot) => {
                this.userConferences = [];
                querySnapshot.forEach((doc) => {
                  this.userConferences.push(doc.data());
                });
              });
    },
    getUserName(){
          db.collection("userProfile")
              .onSnapshot((querySnapshot) => {
                this.userId = [];
                    querySnapshot.forEach((doc) => {
                      this.userId.push(doc.id);
                    });
              });
    },
    removeConference(doc){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          if (confirm("Czy napewno chcesz usunac konferencje?") == true) {
            db.collection("konferencje")
                .doc(doc)
                .delete();
          } else {
            false;
          }
        }
      });
    },
    getDyscypliny(index) {
      let availableDiscipline = ['Wszystkie'];

      db.collection("konferencje")
          .onSnapshot((querySnapshot) => {
            this.conferenceFilter = [];
            querySnapshot.forEach((doc) => {
              this.conferenceFilter.push(doc.data());

              for (let i = 0; i < this.conferenceFilter.length; i++) {
                let obj = this.conferenceFilter[i];
                for (let key in obj) {
                  let value = obj[key];
                  if (key === 'dyscyplia') {
                    availableDiscipline.push(value);
                  }
                }
              }
              this.userConferences = this.conferenceFilter;
            });
            let availableDisciplineNoDuplicates = [...new Set(availableDiscipline)];
            if (availableDisciplineNoDuplicates.indexOf(index) === -1) {
              this.conferenceFilter = [];
              this.userConferences = this.conferenceFilter;
            } else {
              db.collection("konferencje").where('dyscyplia', '==', index)

                  .onSnapshot((querySnapshot) => {
                    this.conferenceFilter = [];
                    querySnapshot.forEach((doc) => {
                      this.conferenceFilter.push(doc.data());
                      this.userConferences = this.conferenceFilter;
                    });
                  });
            }
          });
    },
    getCurrentLoggedInUserID(){
      firebase.auth().onAuthStateChanged((user) => {
        this.currentUserID = user.uid;
      })
    },

    addToFavorites() {
      // conference_id
      // const favorite_ref = db.collection('favorites').doc()
      // const doc = favorite_ref.get();
      // console.log(doc);
      // if (!doc) {
      //   console.log('No such document!');
      // } else {
      //   console.log('Document data:', doc.data());
      // }
      //
      // if(doc !== this.favorite_doc_exist){
      // this.favorite_doc_exist = null;

      // db.collection("favorites").where('user_id', "==", this.currentUserID)
      //
      //     .onSnapshot((querySnapshot) => {
      //       querySnapshot.forEach((doc) => {
      //
      //
      //         this.favorite_doc_exist = doc.data().favorite_doc_id;
      //         console.log(this.favorite_doc_exist);
      //         console.log('check ', this.favorite_doc_exist);
      //
      //
      //
      //       });
      //     })
      //
      // if(this.favorite_doc_exist !== null){
      //   console.log('exist')
      // }else {
      //   console.log('dont exist')
      // }

      // db.collection('favorites').doc(this.favorite_doc_exist)
      //     .onSnapshot((querySnapshot) => {
      //       querySnapshot.forEach((doc) => {
      //         // this.favorite_doc_exist = null;
      //
      //         console.log(doc.data());
      //
      //         if (this.favorite_doc_exist !== null) {
      //           console.log('exist')
      //         } else {
      //           console.log('dont exist')
      //         }
      //
      //       })
      //       });
      //



     //
     // db.collection('favorites').doc(  this.favorite_doc_exist).get()
     //  .then((docData) => {
     //    // console.log(())
     //    if (docData != null ) {
     //      // document exists (online/offline)
     //      console.log('exist')
     //    } else {
     //      // document does not exist (only on online)
     //      console.log('dont exist')
     //    }
     //  })
      // db.collection("favorites").where('user_id', "==", this.currentUserID)
      //     .onSnapshot((querySnapshot) => {
      //       querySnapshot.forEach((doc) => {
      //          this.favorite_doc_exist = doc.data().favorite_doc_id;
      //
      //
      //           // console.log(db.collection('favorites').doc(this.favorite_doc_exist));
      //           db.collection('favorites')
      //               .doc(this.favorite_doc_exist)
      //               .update({
      //                 favorite_conference_id: firebase.firestore.FieldValue.arrayUnion(conference_id)
      //
      //               })
      //           console.log('a ', this.favorite_doc_exist);
      //
      //       });
      //
      //     })
      // }
      // else {
      //   console.log('else');
      //
      // }

      // firebase.auth().onAuthStateChanged(() => {
      //   // if()
      //   db.collection('favorites')
      //       .add({
      //         user_id: this.currentUserID,
      //         favorite_conference_id: {
      //           conference_id
      //         },
      //       })
      //       .then((docRef) => {
      //         this.favorite_doc_id = docRef.id
      //         db.collection('favorites')
      //             .doc(this.favorite_doc_id)
      //             .update({
      //               favorite_doc_id: this.favorite_doc_id,
      //             })
      //             .catch((error) => {
      //               console.log("Error Adding to favorites ", error);
      //             });
      //         console.log('added to favorites');
      //       });
      // })




    }
  },
  created() {
    this.getCurrentLoggedInUserID()
    this.getAllConferences();
    this.getUserName();
  }
}
</script>

<style lang="css">

</style>