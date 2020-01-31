<template>
  <b-menu>
    <b-message type="is-info">
      <h6 class="title is-6">POS กำลังพัฒนาอยู่!</h6>
    </b-message>
    <b-menu-list label="เมนู">
      <b-menu-item
        icon="shopping-outline"
        :active="isActive"
        :expanded="isActive"
        @click="isActive = !isActive"
      >
        <template slot="label" slot-scope="props">
          สินค้า
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-down' : 'menu-up'"
          >
          </b-icon>
        </template>
        <b-menu-item icon="store" label="ภาพรวมสินค้า"></b-menu-item>
        <b-menu-item icon="warehouse" label="คลังสินค้า"></b-menu-item>
      </b-menu-item>
      <b-menu-item icon="account" label="บัญชี">
        <b-menu-item
          icon="account-details"
          label="ข้อมูลส่วนตัว"
          tag="router-link"
          to="/backend/profile"
        ></b-menu-item>
        <b-menu-item icon="account-key" label="เปลี่ยนรหัสผ่าน"></b-menu-item>
      </b-menu-item>
    </b-menu-list>
    <b-menu-list>
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
  padding: 0px 1.75rem 0px 1.75rem;
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
