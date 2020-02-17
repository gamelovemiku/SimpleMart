<template>
  <section>
    <h1 class="title is-3">Profile</h1>
    <p class="subtitle is-4">ข้อมูลส่วนตัว</p>
    <div class="columns">
      <div class="column is-3">
        <figure class="image is-256x256" style="align: center">
          <img
            class="is-rounded"
            :src="
              'https://www.babybedding.com/images/fabric/white-and-gray-zig-zag-fabric_large.jpg' ||
                authUser.photoURL
            "
          />
        </figure>
      </div>
      <div class="column is-9">
        <div class="content">
          <table class="table">
            <tbody>
              <tr>
                <th>UID</th>
                <th>{{ authUser.uid }}</th>
              </tr>
              <tr>
                <th>ชื่อที่แสดง</th>
                <th>{{ authUser.displayName || authUser.email }}</th>
              </tr>
              <tr>
                <th>อีเมลที่ลงทะเบียน</th>
                <th>
                  {{ authUser.email }}
                  <b-tag
                    v-if="authUser.emailVerified == true"
                    type="is-dark is-success"
                    >ยืนยันแล้ว</b-tag
                  >
                </th>
              </tr>
              <tr v-if="authUser.providerData[0].providerId != null">
                <th>ผู้ให้บริการ</th>
                <th>
                  {{ authUser.providerData[0].providerId }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
//import { auth } from "../../firebase";
export default {
  data() {
    return {
      authUser: this.$store.getters.getUser
    };
  },
  methods: {},
  mounted() {
    document.title =
      "ข้อมูลส่วนตัว " + this.$store.state.settings.backend.title;
  }
};
</script>

<style scoped></style>
