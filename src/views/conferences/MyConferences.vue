<template>
  <div v-if="userConferences">
    <!-- component -->
    <!-- This is an example component -->

    <h1 v-if="userConferences.length === 0" class="text-3xl py-4 mt-2">Aktualnie nie posiadasz zadnych konferencji</h1>
    <h1 v-else class="text-3xl py-4 mt-2">Moje Konferencje</h1>

    <div class="w-3/4 m-auto mt-5 mb-5"  v-for="userConference in userConferences" v-bind:key="userConference.id">
    <div class="flex flex-col border rounded-lg overflow-hidden bg-white">
      <div class="grid grid-cols-1 sm:grid-cols-4">
        <div class="flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center">
          <p class="text-2xl font-bold text-[#0ed3cf] rounded-full">{{ userConference.tytul }}</p>
        </div>
        <div class="flex flex-col sm:border-l col-span-3">
          <div class="flex flex-col space-y-4  p-6 text-gray-600">
            <div v-if="userProfile" class="flex flex-row text-sm">

              <p class="flex items-center  text-gray-500">
                <span class="font-semibold mr-2 text-xl uppercase">Użytkownik:</span>
                <span><span class="text-xl">{{ userProfile.name }}</span></span>
              </p>
            </div>
            <div class="flex flex-row text-sm">

              <p class="flex items-center  text-gray-500">
                <span class="font-semibold mr-2 text-xs uppercase text-xl">Tytuł:</span>
                <span class="text-xl">{{ userConference.tytul }}</span>
              </p>
            </div>
            <div class="flex flex-row text-sm">
              <p class="flex items-center  text-gray-500">
                <span class="font-semibold mr-2 text-xs uppercase text-xl">Dyscyplia:</span>
                <span class="text-2xl">{{ userConference.dyscyplia }}</span>
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
                <span class="font-semibold mr-2 text-xs uppercase text-xl">Miejscowość:</span>
                <span class="text-xl">{{ userConference.miejscowosc }}</span>
<!--                <span class="text-xl">{{ userConference.created }}</span>-->
              </p>
            </div>
            <div class="flex flex-row text-sm">
              <p class="flex items-center  text-gray-500">
                <span class="font-semibold mr-2 text-xs uppercase text-xl">Organizator:</span>
                <span class="text-xl">{{ userConference.organizator }}</span>
              </p>
            </div>
            <div class="flex flex-row text-sm">
              <p class="flex items-center  text-gray-500">
                <span class="font-semibold mr-2 text-xs uppercase text-xl">Kontakt:</span>
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
            <div v-if="userConference.kuid === user_uid" class="flex flex-col w-full relative bottom-0">
              <div
                  class="grid grid-cols-3 border-t divide-x text-gray-500  bg-gray-50 dark:bg-transparent py-3">
                <a  v-on:click="removeConference(userConference.kid)"
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
import firebase from  "firebase/compat/app";
let db = firebase.firestore();
export default {
  name: 'MyConference',
  data: function () {
    return {
      userConferences:[],
      conferenceTitle: '',
      userProfile: '',
      user_uid: '',
    };
  },
  methods:{
    getUserConferences(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("konferencje").where('kuid', "==", user.uid)
              .onSnapshot((querySnapshot) => {
            this.userConferences = [];
             querySnapshot.forEach((doc) => {
             this.userConferences.push(doc.data());
             this.conferenceTitle = doc.data().conferenceTitle;

            });
          })
        }
      });
    },
    getUserName(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("userProfile")
              .doc(user.uid)
              .onSnapshot((doc) => {
                this.userProfile = doc.data();
              });
        } else {
          this.userProfile = null;
        }
      });
    },
    removeConference(doc){
          db.collection("konferencje")
              .doc(doc)
              .delete();
          alert(doc.kid);
      alert("deleted");
    },
    checkForLogInUser(){
      firebase.auth().onAuthStateChanged((user) => {
        this.user_uid =  user.uid;
      })
    }
  },
  created() {
    this.getUserConferences();
    this.getUserName();
    this.checkForLogInUser();
  }

}
</script>