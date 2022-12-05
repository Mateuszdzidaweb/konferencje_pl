import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/style.css';
import firebase from "firebase/compat/app";
import './components/firebaseinit';





Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      render: function (h) { return h(App) }
    }).$mount('#app')
  }
})

