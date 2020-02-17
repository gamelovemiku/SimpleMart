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
    role: null,
    items: {},
    history: {},
    navbar: {
      authModalOpen: false
    },
    dashboard: {
      total: {
        members: 0,
        items: 0,
        history: 0,
        income: 0
      }
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
    getUserRow(state) {
      return state.role;
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
    },
    SET_HISTORY(state, value) {
      state.history = value;
    },
    SET_USER_ROLE(state, value) {
      state.role = value;
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
          message: `เข้าสู่ระบบแล้วในชื่อของ ${result.user.displayName} | ${result.user.uid}`,
          position: "is-bottom",
          type: "is-success"
        });
        let data = {
          role: "user"
        };
        db.collection("user_settings")
          .doc(result.user.uid)
          .set(data)
          .then(() => {
            this.getUserRow();
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
        let data = {
          role: "user"
        };
        db.collection("user_settings")
          .doc(result.user.uid)
          .set(data)
          .then(() => {
            this.getUserRow();
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
        let data = {
          role: "user"
        };
        db.collection("user_settings")
          .doc(result.user.uid)
          .set(data)
          .then(() => {
            this.getUserRow();
          });
        context.commit("IS_MODAL_OPEN", false);
        router.replace("/backend/profile");
      });
    },
    signOut: function() {
      auth.signOut().then(response => {
        window.console.log(response);
        window.console.log(router.currentRoute.path);
        if (router.currentRoute.path != "/") {
          router.replace("/");
        }
        Toast.open("ออกจากระบบแล้ว!");
      });
    },
    getUserRow: function(context) {
      db.collection("user_settings")
        .doc(this.state.user.uid)
        .get()
        .then(doc => {
          context.commit("SET_USER_ROLE", doc.data().role);
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
    getAllHistory: function(context) {
      db.collection("sale_history")
        .get()
        .then(querySnapshot => {
          context.commit(
            "SET_HISTORY",
            querySnapshot.docs.map(doc => doc.data())
          );
        })
        .catch(err => {
          window.console.log("Not found history..", err);
        });
    },
    closeModal: function(context) {
      window.console.log("CLOSE");
      context.commit("IS_MODAL_OPEN", false);
    }
  },
  modules: {}
});
