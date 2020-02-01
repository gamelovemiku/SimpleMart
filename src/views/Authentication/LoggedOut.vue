<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h4 class="title is-4">คุณออกจากระบบเรียบร้อยแล้ว</h4>
          <p class="subtitle is-6">ออกจากระบบเรียบร้อยแล้ว</p>
          <div class="content">
            <h6 class="subtitle is-6">
              สิ่งที่คุณไม่สามารถทำได้เมื่อออกจากระบบไปแล้ว
            </h6>
            <ul>
              <li>ไม่สามารถใช้ระบบขายหน้าร้านได้</li>
              <li>ไม่สามารถจัดการสินค้าได้</li>
              <li>ไม่สามารถแก้ไขข้อมูลส่วนตัวได้</li>
            </ul>
          </div>
          <div class="buttons">
            <b-button type="is-primary" tag="router-link" to="/">
              กลับสู่หน้าหลัก
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { auth } from "../../firebase";
export default {
  data() {
    return {
      authUser: "Not loggin",
      form: {
        username: "",
        email: "gamelovemiku@gmail.com",
        password: "123456789"
      },
      loading: false
    };
  },
  methods: {
    register: function() {
      auth
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(
          user => {
            window.console.log(user);
          },
          err => window.console.log("Error! ", `${err.message}`, "error")
        )
        .finally(() => (this.loading = false));
    },
    signIn: function() {
      auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(
          user => {
            window.console.log(user);
          },
          err => {
            this.$buefy.toast.open({
              duration: 8000,
              message: `${err.message}`,
              position: "is-bottom",
              type: "is-danger"
            });
            window.console.log("Error:", `${err.message}`, "error");
          }
        )
        .finally(() => (this.loading = false));
    },
    signOut: function() {
      this.$store.dispatch("signOut");
    },
    signInWithGoogle: function() {
      this.$store.dispatch("signInWithGoogle");
    },
    signInWithFacebook: function() {
      this.$store.dispatch("signInWithFacebook");
    }
  },
  mounted() {
    this.$store.dispatch("callSession");
  }
};
</script>

<style lang="scss">
.is-spaced {
  margin-top: 2rem;
}
</style>
