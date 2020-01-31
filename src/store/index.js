import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLoggedIn: false
    }
  },
  getters: {
    getLoggedIn(state) {
      return state.user;
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
