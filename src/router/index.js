import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import { ToastProgrammatic as Toast } from "buefy";
import { SnackbarProgrammatic as Snackbar } from "buefy";

import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Global from "../views/Global.vue";
import Login from "../views/Authentication/Login.vue";
import LoggedOut from "../views/Authentication/LoggedOut.vue";
import POS from "../views/POS.vue";

import Backend from "../views/backend/Backend.vue";
import ItemManager from "../views/backend/ItemManager.vue";
import Profile from "../views/backend/Profile.vue";
import SaleHistory from "../views/backend/SaleHistory.vue";

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
    component: POS,
    beforeEnter: async function(to, from, next) {
      if (store.getters.getUser == null) {
        Snackbar.open({
          duration: 3000,
          message: `ตรวจสิทธิ์ในการเข้าใช้งาน<br/><small>กำลังตรวจการเข้าสู่ระบบ นี่อาจใช้เวลาไม่นานถึง 5 ปี</small>`,
          position: "is-bottom",
          type: "is-danger",
          queue: false,
          actionText: "ลองใหม่",
          onAction: () => {}
        });
        await setTimeout(() => {
          window.console.log("Checking first entry...");
          if (store.getters.getUser != null) {
            window.console.log(
              "Accept! | Auth is already logged as " +
                store.getters.getUser.displayName
            );
            next();
          } else {
            Toast.open({
              duration: 3000,
              message: `คุณไม่มีสิทธิ์เข้าใช้งานส่วนนี้`,
              position: "is-bottom",
              type: "is-danger",
              queue: false
            });
            window.console.log("Denied! | Auth is not logged");
          }
        }, 3000);
      } else {
        window.console.log("You are already logged in!");
        next();
      }
    }
  },
  {
    path: "/backend",
    name: "backend",
    component: Backend,
    children: [
      {
        path: "itemmanager",
        name: "itemmanager",
        component: ItemManager
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "history",
        name: "history",
        component: SaleHistory
      }
    ],
    beforeEnter: async function(to, from, next) {
      if (store.getters.getUser == null) {
        Snackbar.open({
          duration: 3000,
          message: `ตรวจสิทธิ์ในการเข้าใช้งาน<br/><small>กำลังตรวจการเข้าสู่ระบบ นี่อาจใช้เวลาไม่นานถึง 5 ปี</small>`,
          position: "is-bottom",
          type: "is-danger",
          actionText: "ลองใหม่",
          queue: false,
          onAction: () => {}
        });
        await setTimeout(() => {
          window.console.log("Checking first entry...");
          if (store.getters.getUser != null) {
            window.console.log(
              "Accept! | Auth is already logged as " +
                store.getters.getUser.displayName
            );
            next();
          } else {
            Toast.open({
              duration: 3000,
              message: `คุณไม่มีสิทธิ์เข้าใช้งานส่วนนี้`,
              position: "is-bottom",
              type: "is-danger",
              queue: false
            });
            window.console.log("Denied! | Auth is not logged");
          }
        }, 3000);
      } else {
        window.console.log("You are already logged in!");
        next();
      }
    }
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
