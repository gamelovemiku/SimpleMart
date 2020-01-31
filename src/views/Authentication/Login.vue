<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="card">
            <h4 class="title is-4">User: {{ authUser.email }}</h4>
            <pre>{{ authUser }}</pre>
            <div class="buttons">
              <b-button type="is-primary" expanded @click="signIn()">
                เข้าสู่ระบบ
              </b-button>
              <b-button type="is-light" expanded @click="signInWithGoogle()">
                Google
              </b-button>
              <b-button type="is-danger" expanded @click="signOut()">
                SignOut
              </b-button>
            </div>
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
          err => window.console.log("Error! ", `${err.message}`, "error")
        )
        .finally(() => (this.loading = false));
    },
    signOut: function() {
      this.$store.dispatch("signOut");
    },
    signInWithGoogle: function() {
      this.$store.dispatch("signInWithGoogle");
    }
  },
  mounted() {
    auth.onAuthStateChanged(data => (this.authUser = data));
  }
};
</script>

<style lang="scss">
.is-spaced {
  margin-top: 2rem;
}
</style>
