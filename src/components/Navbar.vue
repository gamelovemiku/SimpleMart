<template>
  <section>
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
        <b-navbar-item tag="router-link" :to="{ path: '/backend/itemmanager' }">
          จัดการสินค้า
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
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

    <b-modal :active.sync="isCardModalActive" :width="720" scroll="keep">
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
                <b-input value="123" type="password" maxlength="30"></b-input>
              </b-field>

              <div class="buttons">
                <b-button type="is-primary" expanded>เข้าสู่ระบบ</b-button>
                <b-button type="is-text is-small" expanded>
                  ยังไม่ได้เป็นสมาชิก?
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
    </b-modal>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isImageModalActive: false,
      isCardModalActive: false
    };
  }
};
</script>

<style>
.card {
  border-radius: 1rem;
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
