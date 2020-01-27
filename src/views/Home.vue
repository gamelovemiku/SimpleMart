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

        <b-dropdown-item aria-role="listitem">
          ค้นหารายละเอียดสินค้า
        </b-dropdown-item>
        <b-dropdown-item aria-role="listitem">
          ระบบ Point of sale
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </section>
</template>

<script>
export default {
  name: "home",
  mounted() {
    window.console.log("HOME is loaded!");
  }
};
</script>

<style scoped>
.content.is-spaced {
  margin-top: 0.75rem;
}
</style>
