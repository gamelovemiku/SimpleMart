<template>
  <section>
    <div class="container">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <b>SimpleMart</b>
          </b-navbar-item>
          <a class="navbar-item" href="https://github.com/gamelovemiku/SimpleMart">
            <b-icon
              pack="fab"
              icon="github"
            ></b-icon>
          </a>
        </template>
        <template slot="start">
          <b-navbar-item tag="router-link" :to="{ path: '/global' }">
            สินค้าทั้งหมด
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/search' }">
            ค้นหาสินค้า
          </b-navbar-item>
        </template>

        <template slot="end">
          <b-navbar-item
            v-if="userSession != null"
            tag="router-link"
            :to="{ path: '/backend/itemmanager' }"
          >
            <a class="button is-link">จัดการสินค้า</a>
          </b-navbar-item>
          <b-navbar-dropdown
            v-if="userSession != null"
            :label="userSession.displayName || userSession.email"
          >
            <b-navbar-item tag="router-link" to="/backend/itemmanager">
              สินค้า
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/backend/profile">
              บัญชี
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/pos">
              ระบบขายหน้าร้าน
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/backend/history">
              ประวัติการขาย
            </b-navbar-item>
            <hr class="navbar-divider" />
            <b-navbar-item @click="signOut()">
              ออกจากระบบ
            </b-navbar-item>
          </b-navbar-dropdown>
          <b-navbar-item v-if="userSession == null">
            <div class="buttons">
              <a class="button is-primary">
                สมัครสมาชิก
              </a>
              <a
                class="button is-light"
                @click="$store.state.navbar.authModalOpen = true"
              >
                เข้าสู่ระบบ
              </a>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>

    <b-modal
      :active.sync="$store.state.navbar.authModalOpen"
      :width="360"
      scroll="keep"
    >
      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column is-12">
              <h4 class="title is-4">Login</h4>
              <p class="subtitle is-6">เข้าสู่ระบบ</p>
              <b-field label="ชื่อผู้ใช้">
                <b-input v-model="form.email"></b-input>
              </b-field>

              <b-field label="รหัสผ่าน">
                <b-input v-model="form.password" type="password"></b-input>
              </b-field>

              <div class="buttons is-right" style="margin-top: 1.25rem">
                <b-button type="is-text is-small">
                  ยังไม่ได้เป็นสมาชิก?
                </b-button>
                <b-button type="is-primary" @click="signIn()">
                  เข้าสู่ระบบ
                </b-button>
              </div>
              <gb-social-button
                iconPath="/assets/icons"
                network="facebook"
                style="margin-bottom: 0.65rem"
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
                style="margin-bottom: 0.65rem"
                size="small"
                theme="light"
                @click="$store.dispatch('signInWithGoogle')"
                full-width
              >
                เข้าสู่ระบบด้วย Google
              </gb-social-button>
              <gb-social-button
                iconPath="/assets/icons"
                network="twitter"
                style="margin-bottom: 0.65rem"
                size="small"
                theme="light"
                @click="$store.dispatch('signInWithTwitter')"
                full-width
              >
                เข้าสู่ระบบด้วย Twitter
              </gb-social-button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { auth } from "../firebase";
export default {
  data() {
    return {
      isCardModalActive: false,
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register: function() {
      auth
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(
          () => {
            this.$store.dispatch("closeModal");
          },
          err => window.console.log("Error! ", `${err.message}`, "error")
        )
        .finally(() => (this.loading = false));
    },
    signIn: function() {
      auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(
          () => {
            this.$buefy.toast.open({
              message: `เข้าสู่ระบบแล้ว`,
              type: "is-success"
            });
            this.$store.dispatch("closeModal");
          },
          err => {
            this.$buefy.toast.open({
              message: `ไม่สามารถเข้าสู่ระบบได้ ${err}`,
              type: "is-danger"
            });
          }
        )
        .finally(() => (this.loading = false));
    },
    signInWithGoogle: function() {
      this.$store.dispatch("signInWithGoogle");
    },
    signOut: function() {
      this.$store.dispatch("signOut");
    },
    testbutton: function() {
      window.console.log("LOGGIN AS: " + this.$store.getters.getUser);
      window.console.log("MODAL: " + this.$store.getters.isAuthModalOpen);
    }
  },
  computed: {
    userSession: function() {
      return this.$store.getters.getUser;
    },
    userRow: function() {
      return this.$store.getters.getUserRow;
    }
  },
  mounted() {
    this.$store.dispatch("callSession");
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
