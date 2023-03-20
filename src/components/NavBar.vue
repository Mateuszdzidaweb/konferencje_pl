<template>
 <div>
   <!-- follow me on twitter @asad_codes -->

   <div class="flex flex-wrap">
     <section class="relative mx-auto">
       <!-- navbar -->
       <nav class="flex justify-between bg-gray-900 text-white w-screen">
         <div class="px-5 xl:px-12 py-6 flex w-full items-center">
           <a class="text-3xl font-bold font-heading" href="/">
             <!-- <img class="h-9" src="logo.png" alt="logo"> -->
             Koferencje.pl
           </a>
           <!-- Nav Links -->
           <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
             <li><a class="hover:text-gray-200" href="/">Konferencja</a></li>
             <router-link  class="hover:text-gray" to="/my-conferences">Moje Konferencje</router-link>
             <router-link  class="hover:text-gray" to="/add-conferences">Dodaj Konferencje</router-link>
             <router-link  class="hover:text-gray" to="/favorites">Ulubione</router-link>
           </ul>
           <!-- Header Icons -->
           <div v-if="user" class="hidden xl:flex items-center space-x-5 items-center">
             <span>Witaj {{user.email}}</span>

           </div>
         </div>
         <!-- Responsive navbar -->
         <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading items-center space-x-12">
           <router-link v-if="!user" class="hover:text-gray" to="/register">Rejestracja</router-link>
           <router-link v-if="!user" class="hover:text-gray" to="/login">Login</router-link>
           <li><button v-if="user" v-on:click="logout" class="hover:text-gray w-24">Wyloguj</button></li>

         </ul>
         <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
           </svg>
         </a>
       </nav>

     </section>
   </div>
 </div>
</template>

<script>
import firebase from 'firebase/compat/app';
// import * as firebase from 'firebase';
// import firebase from 'firebase/app';
import 'firebase/firestore';
// import 'firebase/auth';
// let db = firebase.firestore();
export default {
  name: 'nav-bar',
    data(){
      return{
      user: '',
      }
  },
  methods:{
      logout(){
         firebase.auth()
             .signOut()
             .then(() => {
               this.$router.push('/login')
             });
      }
  },
  created() {
    this.user = firebase.auth().currentUser || false;
    //
    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       db.collection("userProfile")
    //           .doc(user.uid)
    //           .onSnapshot((doc) => {
    //             this.userProfile = doc.data();
    //           });
    //     } else {
    //       this.userProfile = null;
    //     }
    //   });
  }
}
</script>

