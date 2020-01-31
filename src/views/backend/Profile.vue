<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1">Profile</h1>
      <p class="subtitle is-4">ข้อมูลส่วนตัว</p>
      <pre>{{ authUser }}</pre>
    </div>
  </section>
</template>

<script>
import { auth } from "../../firebase";
export default {
  data() {
    return {
      authUser: "Not loggin"
    };
  },
  methods: {},
  mounted() {
    auth.onAuthStateChanged(data => (this.authUser = data));
  }
};
</script>

<style scoped></style>
