<template>
  <b-menu>
    <b-message type="is-info">
      <h6 class="title is-6">POS is in beta!</h6>
    </b-message>
    <b-menu-list label="Menu">
      <b-menu-item icon="account" label="Profile"></b-menu-item>
      <b-menu-item
        icon="settings"
        :active="isActive"
        :expanded="isActive"
        @click="isActive = !isActive"
      >
        <template slot="label" slot-scope="props">
          Item Manager
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-down' : 'menu-up'"
          >
          </b-icon>
        </template>
        <b-menu-item icon="account" label="Users"></b-menu-item>
        <b-menu-item icon="cellphone-link">
          <template slot="label">
            Devices
            <b-dropdown
              aria-role="list"
              class="is-pulled-right"
              position="is-bottom-left"
            >
              <b-icon icon="dots-vertical" slot="trigger"></b-icon>
              <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
              <b-dropdown-item aria-role="listitem"
                >Another action</b-dropdown-item
              >
              <b-dropdown-item aria-role="listitem"
                >Something else</b-dropdown-item
              >
            </b-dropdown>
          </template>
        </b-menu-item>
        <b-menu-item
          icon="cash-multiple"
          label="Payments"
          disabled
        ></b-menu-item>
      </b-menu-item>
      <b-menu-item icon="account" label="My Account">
        <b-menu-item label="Account data"></b-menu-item>
        <b-menu-item label="Addresses"></b-menu-item>
      </b-menu-item>
    </b-menu-list>
    <b-menu-list>
      <b-menu-item
        label="Expo"
        icon="link"
        tag="router-link"
        target="_blank"
        to="/expo"
      >
      </b-menu-item>
    </b-menu-list>
    <b-menu-list label="Actions">
      <b-menu-item label="Logout"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  data() {
    return {
      isActive: true
    };
  }
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
