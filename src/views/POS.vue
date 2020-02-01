<template>
  <section class="section">
    <div class="container is-fluid">
      <a class="is-size-7" @click="$router.go(-1)">กลับไปส่วนจัดการสินค้า</a>
      <div class="level">
        <div class="level-left">
          <div>
            <h4 class="title is-4">
              Point of Sale
              <b-icon
                pack="fas"
                icon="sync-alt"
                custom-class="fa-spin fa-xs"
                v-show="isLoading == true"
              ></b-icon>
            </h4>
            <p class="subtitle is-6">ระบบคำนวณราคาสินค้า</p>
          </div>
        </div>
        <div class="level-right">
          <div>
            <p class="is-size-6 has-text-right">ราคาสุทธิ</p>
            <p class="title is-4">{{ totalPrice }} บาท</p>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-2">
          <div class="boxx">
            <b-field grouped>
              <b-field expanded label="บาร์โค๊ด">
                <b-field>
                  <b-input
                    v-model="barcode"
                    size="is-normal"
                    v-on:keyup.enter="pushWithBarcode()"
                    maxlength="13"
                    expanded
                  ></b-input>
                  <p class="control">
                    <button
                      class="button is-small is-normal"
                      @click="pushWithBarcode()"
                    >
                      <span class="icon">
                        <span class="mdi mdi-cart-arrow-down"></span>
                      </span>
                    </button>
                  </p>
                </b-field>
              </b-field>
            </b-field>
            <b-field grouped>
              <b-field label="เงินที่ได้รับ" expanded>
                <b-field>
                  <b-numberinput
                    v-model="moneypaid"
                    size="is-normal"
                    controls-position="compact"
                    expanded
                  ></b-numberinput>
                </b-field>
              </b-field>
            </b-field>
            <b-field label="คำอธิบาย" style="margin-top:1.75rem;">
              <div class="content">
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      เงินที่ได้รับ<br />
                      ราคาของทั้งหมด<br />
                      เงินทอน {{ moneypaid }} - {{ totalPrice }}
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item has-text-right">
                      {{ moneypaid }}<br />
                      {{ totalPrice }}<br />
                      {{ moneypaid - totalPrice }}
                    </div>
                  </div>
                </div>
              </div>
            </b-field>
            <b-field label="มูลค่าและการทอนเงิน" style="margin-top: 2rem;">
              <h1 class="title is-1">
                {{ moneypaid - totalPrice }}
                <b-tag v-if="carts.length == 0" type="is-danger"
                  >ไม่มีอะไรอยู่ในตะกร้า!</b-tag
                >
                <b-tag
                  v-if="carts.length > 0 && moneypaid == 0"
                  type="is-warning"
                  >รอเงินจ่าย!</b-tag
                >
                <b-tag
                  v-if="carts.length > 0 && moneypaid > 0"
                  type="is-success"
                  >ที่ต้องทอน</b-tag
                >
              </h1>
            </b-field>
          </div>
        </div>
        <div class="column is-8">
          <div class="boxx">
            <table class="table is-fullwidth is-narrow">
              <thead v-if="carts == []">
                <tr>
                  <th>Barcode</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, index) in carts" :key="cart.barcode">
                  <th>{{ cart.barcode }}</th>
                  <th>{{ cart.description }}</th>
                  <th>{{ cart.price }}</th>
                  <th>
                    <b-button
                      type="is-danger"
                      size="is-small"
                      @click="removeFromCart(index)"
                      >เอาออก</b-button
                    >
                  </th>
                </tr>
                <tr v-if="carts.length == 0">
                  <th col="4">
                    <h4
                      class="title is-4 has-text-centered"
                      style="margin-top: 1rem;"
                    >
                      ตะกร้าว่างเปล่า
                    </h4>
                    <p class="subtitle is-6 has-text-centered">
                      ตอนนี้ไม่มีอะไรอยู่ในตะกร้านี้เลย
                    </p>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="column is-2">
          <aside class="menu">
            <p class="menu-label">
              <b>สินค้าขายแบบพิเศษ</b>
            </p>
            <ul class="menu-list">
              <li>
                <a>
                  <span class="icon is-small">
                    <i class="mdi mdi-candycane"></i>
                  </span>
                  ลูกอม
                </a>
              </li>
              <li>
                <a>
                  <span class="icon is-small">
                    <i class="mdi mdi-egg"></i>
                  </span>
                  ไข่
                </a>
              </li>
            </ul>
            <p class="menu-label">
              Administration
            </p>
          </aside>
          <hr />
          <div class="buttons">
            <b-button
              class="button is-primary is-fullwidth"
              @click="saveCart()"
              outlined
            >
              บันทึกการขาย
            </b-button>
            <b-button class="button is-primary is-fullwidth" outlined>
              เพิ่มสินค้าขายแบบพิเศษ
            </b-button>
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
      isEmpty: true,
      barcode: "8851717040023",
      moneypaid: 0,
      total: 100,
      items: [],
      carts: [],
      isLoading: true,
      isSearching: true
    };
  },
  methods: {
    pushWithBarcode() {
      window.console.log("Getting data...");
      this.isSearching = true;

      db.collection("items")
        .where("barcode", "==", this.barcode)
        .get()
        .then(querySnapshot => {
          let docs = querySnapshot.docs;
          for (let doc of docs) {
            window.console.log(doc.data());
            this.carts.push(doc.data());
          }
          this.barcode = "";
          this.isSearching = false;
        })
        .catch(err => {
          window.console.log("Not found..", err);
          this.isSearching = false;
        });
    },
    saveCart() {
      window.console.log("Saving data...");
      let tranaction = {
        sold: this.carts,
        totalprice: this.totalPrice
      };
      db.collection("sale_history")
        .add(tranaction)
        .then(ref => {
          this.$buefy.snackbar.open({
            message: `Added cart with ID: ${ref.id}`,
            type: "is-success",
            actionText: "เรียบร้อย",
            queue: false
          });
        });
    },
    removeFromCart: function(index) {
      this.$delete(this.carts, index);
    }
  },
  computed: {
    totalPrice: function() {
      var sum = this.carts.reduce(function(accumulate, data) {
        return accumulate + Number(data.price);
      }, 0);
      return sum.toFixed(2);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
section {
  margin-top: -2rem;
}
hr {
  margin: 2.5rem 2.5rem;
}
.card {
  border-radius: 0.35rem;
}

.menu-label {
  letter-spacing: 0px;
}
</style>
