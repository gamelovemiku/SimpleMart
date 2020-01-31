<template>
  <section>
    <div class="container">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <b>SimpleMart</b>
            <b-tag class="tag-logo" rounded> beta</b-tag>
          </b-navbar-item>
        </template>
        <template slot="start">
          <b-navbar-item tag="router-link" :to="{ path: '/global' }">
            สินค้าทั้งหมด
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/search' }">
            ค้นหารายละเอียดสินค้า
          </b-navbar-item>
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/backend/itemmanager' }"
          >
            จัดการสินค้า
          </b-navbar-item>
        </template>

        <template slot="end">
          <b-navbar-dropdown
            v-if="authUser != null"
            :label="authUser.displayName"
          >
            <b-navbar-item href="#">
              สินค้า
            </b-navbar-item>
            <b-navbar-item href="#">
              บัญชี
            </b-navbar-item>
            <b-navbar-item href="#">
              ระบบขายหน้าร้าน
            </b-navbar-item>
            <b-navbar-item href="#">
              ประวัติการขาย
            </b-navbar-item>
            <hr class="navbar-divider" />
            <b-navbar-item @click="signOut()">
              ออกจากระบบ
            </b-navbar-item>
          </b-navbar-dropdown>
          <b-navbar-item tag="router-link" to="/auth" v-if="authUser == null">
            <div class="buttons">
              <a class="button is-primary">
                สมัครสมาชิก
              </a>
              <a class="button is-light" @click="isCardModalActive = true">
                เข้าสู่ระบบ
              </a>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>

    <b-modal :active.sync="isCardModalActive" :width="360" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column is-12">
              <h4 class="title is-4">Login</h4>
              <p class="subtitle is-6">เข้าสู่ระบบ</p>
              <b-field label="ชื่อผู้ใช้">
                <b-input value="johnsilver"></b-input>
              </b-field>

              <b-field label="รหัสผ่าน">
                <b-input value="123" type="password"></b-input>
              </b-field>

              <div class="buttons is-right" style="margin-top: 1.25rem">
                <b-button type="is-text is-small">
                  ยังไม่ได้เป็นสมาชิก?
                </b-button>
                <b-button type="is-primary" @click="signInWithGoogle()">
                  เข้าสู่ระบบ
                </b-button>
              </div>
              <gb-social-button
                iconPath="/assets/icons"
                network="facebook"
                style="margin-bottom: 0.65rem"
                size="small"
                theme="light"
                full-width
              >
                เข้าสู่ระบบด้วย Facebook
              </gb-social-button>
              <gb-social-button
                iconPath="/assets/icons"
                network="google"
                style="margin-bottom: 0.65rem"
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
                style="margin-bottom: 0.65rem"
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
    </b-modal>
  </section>
</template>

<script>
import { auth, GoogleProvider } from "../firebase";
export default {
  data() {
    return {
      isCardModalActive: false,
      authUser: null
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
    signInWithGoogle: function() {
      window.console.log("signInWithGoogle");
      auth.signInWithPopup(GoogleProvider).then(function(result) {
        window.console.log(result.credential.accessToken);
        window.console.log(result.user);
      });
      this.isCardModalActive = false;
      this.$router.replace("/backend/profile");
    },
    signOut: function() {
      auth.signOut().then(result => {
        window.console.log(result);
        this.$buefy.snackbar.open({
          message: "คุณได้ออกจากระบบเรียบร้อยแล้ว",
          type: "is-success",
          position: "is-top",
          actionText: "ไปยังหน้า Login",
          onAction: () => {
            this.$router.replace("/login");
          }
        });
        this.$router.replace("/login");
      });
    }
  },
  mounted() {
    auth.onAuthStateChanged(data => (this.authUser = data));
  }
};
</script>

<style>
.card {
  border-radius: 0.5rem;
}

span.tag.tag-logo {
  margin-left: 0.5rem;
  padding: 4px;
  font-size: 9px;
}

social-button {
  margin: 1.75rem;
}
</style>
