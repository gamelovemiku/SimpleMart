import Vue from "vue";
import Vuex from "vuex";
import router from "./../router";
import { ToastProgrammatic as Toast } from "buefy";
import {
  auth,
  db,
  GoogleProvider,
  FacebookProvider,
  TwitterProvider
} from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    items: {},
    navbar: {
      authModalOpen: false
    },
    settings: {
      general: {
        title: "- SimpleMart"
      },
      backend: {
        title: "- ส่วนจัดการ SimpleMart"
      }
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isAuthModalOpen(state) {
      return state.navbar.authModalOpen;
    }
  },
  mutations: {
    setSession(state, value) {
      state.user = value;
    },
    IS_MODAL_OPEN(state, value) {
      state.navbar.authModalOpen = value;
    },
    SET_ITEMS(state, value) {
      state.items = value;
    }
  },
  actions: {
    callSession: function(context) {
      auth
        .onAuthStateChanged(data => {
          context.commit("setSession", data);
        })
        .then(err => {
          window.console.log(err);
          context.commit("setSession", null);
        });
    },
    signInWithGoogle: function(context) {
      window.console.log("signInWithGoogle" + "" + this.getters.getUser);
      auth.signInWithPopup(GoogleProvider).then(function(result) {
        Toast.open({
          duration: 8000,
          message: `เข้าสู่ระบบแล้วในชื่อของ ${result.user.displayName}`,
          position: "is-bottom",
          type: "is-success"
        });
        context.commit("IS_MODAL_OPEN", false);
        router.replace("/");
      });
    },
    signInWithFacebook: function(context) {
      window.console.log("signInWithFacebook");
      auth.signInWithPopup(FacebookProvider).then(function(result) {
        Toast.open({
          duration: 8000,
          message: `เข้าสู่ระบบแล้วในชื่อของ ${result.user.displayName}`,
          position: "is-bottom",
          type: "is-success"
        });
        context.commit("IS_MODAL_OPEN", false);
        router.replace("/backend/profile");
      });
    },
    signInWithTwitter: function(context) {
      window.console.log("signInWithTwitter");
      auth.signInWithPopup(TwitterProvider).then(function(result) {
        Toast.open({
          duration: 8000,
          message: `เข้าสู่ระบบแล้วในชื่อของ ${result.user.displayName}`,
          position: "is-bottom",
          type: "is-success"
        });
        context.commit("IS_MODAL_OPEN", false);
        router.replace("/backend/profile");
      });
    },
    signOut: function() {
      auth.signOut().then(response => {
        window.console.log(response);
        window.console.log(router.currentRoute.path);
        if (router.currentRoute.path != "/login") {
          router.replace("/login");
        }
        Toast.open("ออกจากระบบแล้ว!");
      });
    },
    getAllItems: function(context) {
      db.collection("items")
        .get()
        .then(querySnapshot => {
          context.commit(
            "SET_ITEMS",
            querySnapshot.docs.map(doc => doc.data())
          );
        })
        .catch(err => {
          window.console.log("Not found..", err);
        });
    },
    closeModal: function(context) {
      window.console.log("CLOSE");
      context.commit("IS_MODAL_OPEN", false);
    }
  },
  modules: {}
});
