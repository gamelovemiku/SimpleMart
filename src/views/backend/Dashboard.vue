<template>
  <section>
    <h1 class="title is-3">ภาพรวม</h1>
    <p class="subtitle is-4">ข้อมูลโดยรวมของส่วนต่างๆ ของร้านค้า</p>
    <div class="columns is-multiline">
      <div class="column is-3">
        <div class="notification">
          <p class="subtitle is-6">สมาชิกทั้งหมด</p>
          <h2 class="title is-2">522 คน</h2>
        </div>
      </div>
      <div class="column is-3">
        <div class="notification">
          <p class="subtitle is-6">สินค้าทั้งหมด</p>
          <h2 class="title is-2">522 ชิ้น</h2>
        </div>
      </div>
      <div class="column is-3">
        <div class="notification">
          <p class="subtitle is-6">ประวัติการขาย</p>
          <h2 class="title is-2">5 รายการ</h2>
        </div>
      </div>
      <div class="column is-3">
        <div class="notification">
          <p class="subtitle is-6">รายได้รวม</p>
          <h2 class="title is-2">1,540 บาท</h2>
        </div>
      </div>
    </div>
    {{ items }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: this.$store.state.items
    };
  },
  methods: {},
  mounted() {
    document.title = "ภาพรวม " + this.$store.state.settings.backend.title;
  }
};
</script>

<style scoped></style>
