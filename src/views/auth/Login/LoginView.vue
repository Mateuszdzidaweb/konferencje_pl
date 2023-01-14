<template>
  <div class="">
    <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css">
    <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css">

    <section class="h-full">
      <div class="w-full lg:w-4/12 px-4 mx-auto pt-6">
        <h1 class="text-3xl py-4">Login</h1>
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div class="rounded-t mb-0 px-6 py-6">
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Email</label>
                <input v-model="email" type="email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email">
              </div>
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Password</label>
                <input v-model="password" type="password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password">
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer"><input id="customCheckLogin" type="checkbox" class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"><span class="ml-2 text-sm font-semibold text-blueGray-600">Remember me</span></label>
              </div>
              <div class="text-center mt-6">
                <button v-on:click="login" class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button"> Sign In </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: 'Log-in',
  data(){
    return{
      email: '',
      password: '',
    }
  },
  methods:{
    login(){
      firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        // let user = userCredential.user;
        `${user.email}`
        this.$router.replace("/");
      })
      .catch((err) =>{
        if (err.code === "auth/wrong-password"){
          alert("Haslo jest nie prawidlowe")
        }else {
          alert('Login lub Haslo jest nie prawidlowe, Sproboj ponownie');
        }
      })
    }
  }
}
</script>

