<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-3">
          <SidebarMenu></SidebarMenu>
        </div>
        <div class="column is-9">
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SidebarMenu from "../../components/SidebarMenu.vue";
export default {
  components: {
    SidebarMenu
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped></style>
