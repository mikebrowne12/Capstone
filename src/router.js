import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Attractions from './views/Attractions.vue'; 
import Signup from './views/Signup.vue';
import Login from "./views/Login.vue"; 
import Logout from "./views/Logout.vue"; 
import NeighborhoodsShow from "./views/NeighborhoodShow.vue"; 
import AttractionShow from "./views/AttractionShow.vue"; 

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { path: "/attractions", name: "attraction", component: Attractions}, 
    { path: "/signup", name: "signup", component: Signup}, 
    { path: "/login", name: "login", component: Login}, 
    { path: "/logout", name: "logout", component: Logout},  
    { path: "/neighborhoods/:id", name: "neighborhoods-show", component: NeighborhoodsShow}, 
    { path: "/attractions/:id", name: "attraction-show", component: AttractionShow}

  ]
});
