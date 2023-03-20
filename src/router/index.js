import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import firebase from "firebase/compat/app";
// import router from "@vue/cli-plugin-router/generator/template/src/router";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    meta:{
      requiresGuest: true,
    },
    component: () => import('../views/auth/Login/LoginView')
  },
  {
    path: '/register',
    name: 'register',
    meta:{
      requiresGuest: true,
    },
    component: () => import('../views/auth/Register/RegisterView')
  },
  {
    path: '/add-conferences',
    name: 'AddConferences',
    meta:{
      requiresAuth: true,
    },
    component: () => import('../views/conferences/AddConferences')
  },
  {
    path: '/my-conferences',
    name: 'MyConferences',
    meta:{
      requiresAuth: true,
    },
    component: () => import('../views/conferences/MyConferences')
  },
  {
    path: '/favorites',
    name: 'MyFavorites',
    meta:{
      requiresAuth: true,
    },
    component: () => import('../views/conferences/FavoritesConferences')
  },
  {
    path: '/single-conference/:kid',
    name: 'SingleConference',
    props: true,
    meta:{
      requiresAuth: false,
    },
    component: () => import('../views/conferences/SingleConference')
  },
  {
    path: '/edit-conference/:kid',
    name: 'EditConference',
    props: true,
    meta:{
      requiresAuth: false,
    },
    component: () => import('../views/conferences/EditConference')
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router
