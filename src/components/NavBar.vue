<template>
 <div>
   <!-- follow me on twitter @asad_codes -->

   <div class="flex flex-wrap">
     <section class="relative mx-auto">
       <!-- navbar -->
       <nav class="flex justify-between bg-gray-900 text-white w-screen">
         <div class="px-5 xl:px-12 py-6 flex w-full items-center">
           <a class="text-3xl font-bold font-heading" href="#">
             <!-- <img class="h-9" src="logo.png" alt="logo"> -->
             Koferencje.pl
           </a>
           <!-- Nav Links -->
           <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
             <li><a class="hover:text-gray-200" href="/">Konferencja</a></li>
             <router-link  class="hover:text-gray" to="/my-conferences">Moje Konferencje</router-link>
             <router-link  class="hover:text-gray" to="/add-conferences">Dodaj Konferencje</router-link>
           </ul>
           <!-- Header Icons -->
           <div class="hidden xl:flex items-center space-x-5 items-center">
             <a class="flex items-center hover:text-gray-200" href="#">
               <span class="flex absolute -mt-5 ml-4">
              <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                </span>
              </span>
             </a>
             <!-- Sign In / Register      -->
             <a class="flex items-center hover:text-gray-200" href="#">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </a>

           </div>
         </div>
         <!-- Responsive navbar -->
         <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading items-center space-x-12">
           <router-link v-if="!user" class="hover:text-gray" to="/register">Rejestracja</router-link>
           <router-link v-if="!user" class="hover:text-gray" to="/login">Login</router-link>
           <li><button v-if="user" v-on:click="logout" class="hover:text-gray w-24">Log out</button></li>

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
import firebase from "firebase/compat/app";
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
  }
}
</script>

