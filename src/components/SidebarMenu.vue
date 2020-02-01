<template>
  <b-menu>
    <b-message type="is-info">
      <h6 class="title is-6">POS กำลังพัฒนาอยู่!</h6>
    </b-message>
    <b-menu-list label="เมนู"></b-menu-list>
    <b-menu-list>
      <b-menu-item
        label="สินค้า"
        icon="store"
        tag="router-link"
        to="/backend/itemmanager"
      >
      </b-menu-item>
      <b-menu-item
        label="ข้อมูลส่วนตัว"
        icon="account-details"
        tag="router-link"
        to="/backend/profile"
      >
      </b-menu-item>
      <b-menu-list label="การบริหาร"></b-menu-list>
      <b-menu-item
        label="ภาพรวม"
        icon="view-dashboard"
        tag="router-link"
        to="/backend/dashboard"
      >
      </b-menu-item>
      <b-menu-item
        label="ระบบขายหน้าร้าน"
        icon="cash-register"
        tag="router-link"
        to="/pos"
      >
      </b-menu-item>
      <b-menu-item
        label="ประวัติการขาย"
        icon="history"
        tag="router-link"
        to="/pos"
      >
      </b-menu-item>
    </b-menu-list>
    <b-menu-list label="การกระทำ">
      <b-menu-item icon="logout" label="ออกจากระบบ"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  data() {
    return {
      isActive: true
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style>
.menu {
  padding: 0px 1rem 0px 1rem;
}
.menu-list {
  border-radius: 0.75rem 2rem 2rem 0.75rem;
}
.menu-list a:hover {
  border-radius: 0.75rem 2rem 2rem 0.75rem;
}
.menu-list a.is-active {
  border-radius: 0.75rem 2rem 2rem 0.75rem;
}
</style>

<style scoped></style>
