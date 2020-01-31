import Vue from "vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import vuesocial from "@growthbunker/vuesocial";
import VueStar from "vue-star";

import App from "./App.vue";

import "./firebase";
import "buefy/dist/buefy.css";

Vue.use(Buefy);
Vue.use(VueStar);
Vue.use(vuesocial);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
