<template>
  <section class="section">
    <div class="container">
      <h4 class="title is-4">
        สินค้าทั้งหมด <small>({{ items.length }})</small>
        <b-icon
          pack="fas"
          icon="sync-alt"
          custom-class="fa-spin fa-xs"
          v-show="isLoading == true"
        ></b-icon>
      </h4>
      <p class="subtitle is-6">แสดงสินค้าทั้งหมดแยกตามหัวข้อ</p>
      <div class="columns is-multiline">
        <div v-for="(item, index) in items" :key="index" class="column is-3">
          <div class="card">
            <div class="card-content">
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
    </div>
  </section>
</template>

<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      items: null,
      isLoading: true
    };
  },
  methods: {
    getAllItems() {
      this.isLoading == true;
      db.collection("items")
        .get()
        .then(querySnapshot => {
          this.items = querySnapshot.docs.map(doc => doc.data());
          this.isLoading = false;
        })
        .catch(err => {
          window.console.log("Not found..", err);
        });
    }
  },
  mounted() {
    document.title =
      "สินค้าทั้งหมด " + this.$store.state.settings.general.title;
    this.getAllItems();
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 0.35rem;
}
</style>
