<template>
  <section>
    <h1 class="title is-3">Profile</h1>
    <p class="subtitle is-4">ข้อมูลส่วนตัว</p>
    <div class="columns">
      <div class="column is-3">
        <figure class="image is-256x256" style="align: center">
          <img class="is-rounded" :src="authUser.photoURL" />
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
                <th>{{ authUser.displayName }}</th>
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
                  <b-tag
                    v-if="authUser.emailVerified == false"
                    type="is-dark is-danger"
                    >ยังไม่ยืนยัน</b-tag
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
import { auth } from "../../firebase";
export default {
  data() {
    return {
      authUser: "Not loggin"
    };
  },
  methods: {},
  mounted() {
    auth.onAuthStateChanged(data => (this.authUser = data));
  }
};
</script>

<style scoped></style>
