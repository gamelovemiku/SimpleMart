<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1">SimpleMart</h1>
      <p class="subtitle is-4">ระบบร้านค้าขายของ ฉบับเรียบง่าย (งานปั่น)</p>
      <div class="content is-spaced">
        <p class="subtitle is-6"><b>Powered by</b> Firebase, Vue.js, Buefy</p>
      </div>

      <b-dropdown aria-role="list">
        <button class="button is-primary is-outlined" slot="trigger">
          <span>เริ่มต้น</span>
          <b-icon icon="menu-down"></b-icon>
        </button>

        <b-dropdown-item
          aria-role="listitem"
          @click="$router.replace('/search')"
        >
          ค้นหาสินค้า
        </b-dropdown-item>
        <b-dropdown-item aria-role="listitem" @click="$router.replace('/pos')">
          ระบบขายหน้าร้าน
        </b-dropdown-item>
        <b-dropdown-item
          aria-role="listitem"
          @click="$router.replace('/backend/itemmanager')"
        >
          ส่วนจัดการระบบ
        </b-dropdown-item>
      </b-dropdown>
      <div class="content is-spaced" v-if="$store.getters.getUser != null">
        <p class="subtitle is-4">
          เข้าสู่ระบบแล้วในนาม {{ $store.getters.getUser.displayName }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "home",
  mounted() {
    document.title = "หน้าหลัก " + this.$store.state.settings.backend.title;
  }
};
</script>

<style scoped>
.content.is-spaced {
  margin-top: 0.75rem;
}
</style>
