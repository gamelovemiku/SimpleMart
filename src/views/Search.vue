<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h4 class="title is-4">ค้นหาสินค้า</h4>
          <p class="subtitle is-6">ค้นหารายละเอียดสินค้าตาม Barcode</p>

          <b-field grouped>
            <b-field expanded>
              <b-field>
                <b-select v-model="searchtype" placeholder="ชนิดการค้นหา">
                  <option value="barcode">Barcode</option>
                  <option value="name">ชื่อสินค้า</option>
                </b-select>
                <b-input
                  placeholder="Search..."
                  v-model="barcode"
                  type="search"
                  expanded
                ></b-input>
                <p class="control">
                  <b-button
                    @click="searchByBarcode"
                    class="button is-primary"
                    :loading="isSearching"
                  >
                    ค้นหา
                  </b-button>
                </p>
              </b-field>
            </b-field>
          </b-field>
          <h4 class="title is-4 is-spaced">ผลการค้นหา</h4>
          <div v-if="items == null" class="content">ยังไม่มีการค้นหาใดๆ</div>
          <div v-for="(item, index) in items" :key="index">
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div>
                  <p class="title is-6">
                    <strong>{{ item.description }}</strong>
                  </p>
                  <p class="subtitle is-7">
                    <strong>{{ item.barcode }}</strong>
                  </p>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <div>
                    <p class="subtitle is-5">
                      <strong>{{ item.price }} บาท</strong>
                    </p>
                    <p class="subtitle is-7 has-text-centered">
                      {{ item.category }}
                    </p>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      barcode: "8851717040023",
      status: "Waiting for action...",
      items: null,
      searchtype: "barcode",
      isSearching: false
    };
  },
  methods: {
    searchByBarcode() {
      // nameRef.push({ name: this.name, edit: false });
      // dataRef.push({ name: this.name, edit: false });

      window.console.log("Getting data...");
      this.isSearching = true;

      db.collection("items")
        .where("barcode", "==", this.barcode)
        .get()
        .then(querySnapshot => {
          this.items = querySnapshot.docs.map(doc => doc.data());
          this.isSearching = false;
        })
        .catch(err => {
          window.console.log("Not found..", err);
          this.isSearching = false;
        });
    }
  },
  mounted() {
    document.title = "ค้นหาสินค้า " + this.$store.state.settings.general.title;
    //this.searchByBarcode();
  }
};
</script>

<style lang="scss">
.is-spaced {
  margin-top: 2rem;
}
</style>
