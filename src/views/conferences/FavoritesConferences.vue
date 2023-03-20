<template>
  <div v-if="userFavoritesConferences">
    <!-- component -->
    <!-- This is an example component -->

    <h1 v-if="userFavoritesConferences.length === 0" class="text-3xl py-4 mt-2">Nie Posiadasz Ulubionych konferencji</h1>
    <h1 v-else class="text-3xl py-4 mt-2">Ulubione</h1>

    <div class="w-3/4 m-auto mt-5 mb-5"  v-for="userFavoritesConference in userFavoritesConferences" v-bind:key="userFavoritesConference.id">
      <div class="flex flex-col border rounded-lg overflow-hidden bg-white">
        <div class="grid grid-cols-1 sm:grid-cols-4">
          <div class="flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center">
            <p class="text-2xl font-bold text-[#0ed3cf] rounded-full">{{ userFavoritesConference.tytul }}</p>
          </div>
          <div class="flex flex-col sm:border-l col-span-3">
            <div class="flex flex-col space-y-4  p-6 text-gray-600">
              <div v-if="userFavoritesConference" class="flex flex-row text-sm">

                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xl uppercase">Użytkownik:</span>
                  <span><span class="text-xl">{{ userFavoritesConference.name }}</span></span>
                </p>
              </div>
              <div class="flex flex-row text-sm">

                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Tytuł:</span>
                  <span class="text-xl">{{ userFavoritesConference.tytul }}</span>
                </p>
              </div>
              <div class="flex flex-row text-sm">
                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Dyscyplia:</span>
                  <span class="text-2xl">{{ userFavoritesConference.dyscyplia }}</span>
                </p>
              </div>

              <div class="flex flex-row text-sm">
                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Miejsce Konferencji:</span>
                  <span class="text-xl">{{ userFavoritesConference.miejsce_konferencji }}</span>
                </p>
              </div>
              <div class="flex flex-row text-sm">
                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Miejscowość:</span>
                  <span class="text-xl">{{ userFavoritesConference.miejscowosc }}</span>
                  <!--                <span class="text-xl">{{ userConference.created }}</span>-->
                </p>
              </div>
              <div class="flex flex-row text-sm">
                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Organizator:</span>
                  <span class="text-xl">{{ userFavoritesConference.organizator }}</span>
                </p>
              </div>
              <div class="flex flex-row text-sm">
                <p class="flex items-center  text-gray-500">
                  <span class="font-semibold mr-2 text-xs uppercase text-xl">Kontakt:</span>
                  <span class="text-xl">{{ userFavoritesConference.kontakt }}</span>
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
                    {{ userFavoritesConference.opis.substring(0,350)+".." }}
                  </p>
                </div>
              </div>
              <div  class="flex flex-col w-full relative bottom-0">
                <div
                    class="grid grid-cols-3 border-t divide-x text-gray-500  bg-gray-50 dark:bg-transparent py-3">
                  <a v-if="currentUserID === userFavoritesConference.kuid"  v-on:click="removeConference(userFavoritesConference.kid)"
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
                  <router-link :to="{ name: 'SingleConference', params: { kid: userFavoritesConference.kid } }"
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
  name: 'FavoriteConferences',
  data: function () {
    return {
      userFavoritesConferences: [],
      userFavorite: [],
      currentUserID: '',
    };
  },
  methods: {
    getUserFavoritesConferences() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("userProfile")
              .doc(user.uid)
              .onSnapshot((doc) => {
                this.userFavorite = doc.data().favorites;

                let i = 0;
                this.userFavoritesConferences = [];

                while (i < this.userFavorite.length) {
                  db.collection("konferencje").where('kid', '==', this.userFavorite[i])
                      .onSnapshot((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                          this.userFavoritesConferences.push(doc.data());

                        })
                      })
                  i++;
                }

              })
        }
      })
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
    getCurrentLoggedInUserID(){
      firebase.auth().onAuthStateChanged((user) => {
        this.currentUserID = user.uid;
      })
    },
  },
  created() {
    this.getCurrentLoggedInUserID();
    this.getUserFavoritesConferences();
  }

}
</script>