<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="card">
            <div class="card-content">
              <div class="columns">
                <div class="column is-6">
                  <h4 class="title is-4">Login</h4>
                  <p class="subtitle is-6">เข้าสู่ระบบ</p>
                  <b-field label="Username">
                    <b-input value="johnsilver" maxlength="30"></b-input>
                  </b-field>

                  <b-field label="Password">
                    <b-input
                      value="123"
                      type="password"
                      maxlength="30"
                    ></b-input>
                  </b-field>

                  <div class="buttons">
                    <b-button type="is-primary" expanded @click="signIn()">
                      เข้าสู่ระบบ
                    </b-button>
                    <b-button type="is-text is-small" expanded>
                      ยังไม่ได้เป็นสมาชิก?
                    </b-button>
                    <b-button @click="signInWithGoogle()">
                      Google
                    </b-button>
                  </div>
                </div>
                <div class="column is-6">
                  <h4 class="title is-4">Login with Social</h4>
                  <p class="subtitle is-6">เข้าสู่ระบบผ่านโซเชียลเน็ตเวิร์ค</p>
                  <gb-social-button
                    iconPath="/assets/icons"
                    network="facebook"
                    style="margin-bottom: 0.5rem"
                    size="small"
                    theme="light"
                    @click="$store.dispatch('signInWithFacebook')"
                    full-width
                  >
                    เข้าสู่ระบบด้วย Facebook
                  </gb-social-button>
                  <gb-social-button
                    iconPath="/assets/icons"
                    network="google"
                    style="margin-bottom: 0.5rem"
                    size="small"
                    theme="light"
                    @click="signInWithGoogle()"
                    full-width
                  >
                    เข้าสู่ระบบด้วย Google
                  </gb-social-button>
                  <gb-social-button
                    iconPath="/assets/icons"
                    network="github"
                    style="margin-bottom: 0.5rem"
                    size="small"
                    theme="light"
                    full-width
                  >
                    เข้าสู่ระบบด้วย GitHub
                  </gb-social-button>
                </div>
              </div>
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
