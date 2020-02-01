import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Global from "../views/Global.vue";
import ItemManager from "../views/backend/ItemManager.vue";
import Profile from "../views/backend/Profile.vue";
import Login from "../views/Authentication/Login.vue";
import LoggedOut from "../views/Authentication/LoggedOut.vue";
import POS from "../views/POS.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/global",
    name: "global",
    component: Global
  },
  {
    path: "/search",
    name: "search",
    component: Search
  },
  {
    path: "/pos",
    name: "pos",
    component: POS
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/loggedout",
    name: "loggedout",
    component: LoggedOut
  },
  {
    path: "/backend/itemmanager",
    name: "itemmanager",
    component: ItemManager
  },
  {
    path: "/backend/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
