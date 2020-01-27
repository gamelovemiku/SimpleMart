<template>
  <div id="app">
    <Navbar />
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  data() {},
  methods: {},
  mounted() {}
};
</script>

<style lang="scss">
/*
@font-face {
  font-family: Thonburi;
  src: url(./assets/fonts/Thonburi.otf);
}

@font-face {
  font-family: Thonburi;
  src: url(./assets/fonts/Thonburi-Bold.otf);
  font-weight: bold;
}
*/
html,
div,
button,
span {
  font-family: "Segoe UI", "Thonburi", sans-serif;
  -webkit-font-smoothing: antialiased;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
