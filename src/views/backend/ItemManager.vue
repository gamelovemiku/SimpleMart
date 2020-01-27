<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-3">
          <SidebarMenu></SidebarMenu>
        </div>
        <div class="column is-9">
          <h3 class="title is-3">Item Manager</h3>
          <p class="subtitle is-4">ส่วนจัดการสินค้า</p>
          <b-tabs class="block">
            <b-tab-item label="ภาพรวมร้านค้า" icon="chart-histogram">
              <h1 class="title is-1">
                สินค้าทั้งหมด {{ items.length }} ชิ้น ในระบบ
              </h1>
            </b-tab-item>
            <b-tab-item label="จัดการสินค้า" icon="shape">
              <div class="columns is-multiline">
                <div class="column is-8">
                  <div class="buttons is-spaceless">
                    <b-button
                      v-if="selected != null"
                      @click="removeItem()"
                      :loading="isDeleting"
                      type="is-danger"
                      outlined
                    >
                      ลบที่เลือก
                    </b-button>
                    <b-button
                      v-if="selected == null"
                      type="is-danger"
                      disabled
                      outlined
                    >
                      ลบที่เลือก
                    </b-button>
                    <b-button
                      v-if="selected != null"
                      @click="editItem()"
                      type="is-warning"
                      outlined
                    >
                      แก้ไขที่เลือก
                    </b-button>
                    <b-button
                      v-if="selected == null"
                      type="is-warning"
                      disabled
                      outlined
                    >
                      แก้ไขที่เลือก
                    </b-button>
                    <b-button
                      v-if="selected != null"
                      @click="selected = null"
                      type="is-black"
                      outlined
                    >
                      ยกเลิกการเลือก
                    </b-button>
                    <b-button
                      v-if="selected == null"
                      type="is-black"
                      disabled
                      outlined
                    >
                      ยกเลิกการเลือก
                    </b-button>
                  </div>
                  <b-table
                    :data="items"
                    :columns="columns"
                    :selected.sync="selected"
                    :loading="isLoading"
                    paginated="true"
                    per-page="10"
                    pagination-simple="true"
                  ></b-table>
                  <code>{{ selected }}</code>
                </div>
                <div class="column is-4">
                  <div class="card">
                    <div class="card-content">
                      <h4 class="title is-4">เพิ่มสินค้าใหม่</h4>
                      <form @submit="addItem">
                        <b-field label="Barcode">
                          <b-input
                            v-model="form.barcode"
                            maxlength="13"
                          ></b-input>
                        </b-field>
                        <b-field label="Category">
                          <b-select
                            v-model="form.category"
                            placeholder="Category"
                            expanded
                          >
                            <option value="Baverage">Baverage</option>
                            <option value="Food">Food</option>
                            <option value="General">General</option>
                          </b-select>
                        </b-field>
                        <b-field label="Short Description">
                          <b-input
                            type="textarea"
                            v-model="form.description"
                            maxlength="32"
                          ></b-input>
                        </b-field>
                        <b-field label="Price">
                          <b-numberinput
                            v-model="form.price"
                            expanded
                            controlsPosition="compact"
                            min="0"
                          />
                        </b-field>
                        <div class="buttons">
                          <b-button
                            v-if="form.barcode != ''"
                            type="is-primary"
                            native-type="submit"
                            :loading="isAdding"
                            expanded
                            outlined
                          >
                            เพิ่มสินค้าใหม่
                          </b-button>
                          <b-button
                            v-if="form.barcode == ''"
                            type="is-primary"
                            native-type="submit"
                            expanded
                            disabled
                            outlined
                          >
                            เพิ่มสินค้าใหม่
                          </b-button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab-item>
            <b-tab-item label="ภาษี" icon="flower-tulip"></b-tab-item>
          </b-tabs>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from "../../firebase";
import SidebarMenu from "../../components/SidebarMenu.vue";

export default {
  components: {
    SidebarMenu
  },
  data() {
    return {
      form: {
        barcode: "",
        description: "",
        price: 0,
        category: null,
        updated_at: null
      },
      search: {
        barcode: ""
      },
      items: [],
      isLoading: true,
      isDeleting: false,
      isAdding: false,
      selected: null,
      columns: [
        {
          field: "barcode",
          label: "Barcode",
          width: "100",
          sortable: "true",
          searchable: true
        },
        {
          field: "description",
          label: "Description",
          width: "250",
          searchable: true
        },
        {
          field: "price",
          label: "Price",
          sortable: "true",
          width: "100"
        }
      ]
    };
  },
  methods: {
    addItem: function(event) {
      this.isAdding = true;
      event.preventDefault();
      db.collection("items")
        .add(this.form)
        .then(ref => {
          this.$buefy.snackbar.open({
            message: `Added document with ID: : ${ref.id}`,
            type: "is-success",
            actionText: "เรียบร้อย",
            queue: false
          });
          this.getAllItems();
          this.isAdding = false;
        });
    },
    editItem: function() {},
    removeItem: function() {
      this.isDeleting = true;
      db.collection("items")
        .where("barcode", "==", this.selected.barcode)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.$buefy.snackbar.open({
              message: `Delete: ${doc.ref.id}`,
              type: "is-danger",
              actionText: "เรียบร้อย",
              queue: false
            });
            doc.ref.delete();
          });
          this.getAllItems();
          this.isDeleting = false;
          this.selected = null;
          this.isLoading = false;
        })
        .catch(err => {
          window.console.log("Not found..", err);
          this.isDeleting = false;
        });
    },
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
  computed: {},
  mounted() {
    this.getAllItems();
  }
};
</script>

<style scoped>
.card {
  border-radius: 4px;
  border-color: #fff;
}

.buttons:not(:last-child) {
  margin-bottom: 0rem;
}
</style>
