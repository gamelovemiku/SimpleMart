import Vue from "vue";
import Vuex from "vuex";
import router from "./../router";
import { ToastProgrammatic as Toast } from "buefy";
import { auth, GoogleProvider, FacebookProvider } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    navbar: {
      authModalOpen: false
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
    setLoginModal(state, value) {
      state.navbar.authModalOpen = value;
    },
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
    signInWithGoogle: function() {
      window.console.log("signInWithGoogle" + "" + this.getters.getUser);
      auth.signInWithPopup(GoogleProvider).then(function(result) {
        Toast.open({
          duration: 8000,
          message: `เข้าสู่ระบบแล้วในชื่อของ ${result.user.displayName}`,
          position: "is-bottom",
          type: "is-success"
        });
        router.replace("/");
      });
    },
    signInWithFacebook: function() {
      window.console.log("signInWithGoogle" + "" + this.getters.getUser);
      auth.signInWithPopup(FacebookProvider).then(function(result) {
        Toast.open({
          duration: 8000,
          message: `เข้าสู่ระบบแล้วในชื่อของ ${result.user.displayName}`,
          position: "is-bottom",
          type: "is-success"
        });
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
    }
  },
  modules: {}
});
