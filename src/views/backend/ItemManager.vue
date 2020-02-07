<template>
  <section>
    <h3 class="title is-3">สินค้า</h3>
    <p class="subtitle is-4">สำหรับจัดการสินค้าที่มีอยู่ในร้านของคุณ</p>
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
          <b-button v-if="selected == null" type="is-danger" disabled outlined>
            ลบที่เลือก
          </b-button>
          <b-button
            v-if="selected != null"
            @click="modalEdit = true"
            type="is-warning"
            outlined
          >
            แก้ไขที่เลือก
          </b-button>
          <b-button v-if="selected == null" type="is-warning" disabled outlined>
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
          <b-button v-if="selected == null" type="is-black" disabled outlined>
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
          pagination-simple="false"
          narrowed
        ></b-table>
      </div>
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <h4 class="title is-4">เพิ่มสินค้าใหม่</h4>
            <form @submit="addItem">
              <b-field label="Barcode">
                <b-input v-model="form.barcode" maxlength="13"></b-input>
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
                  rows="2"
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
                  :loading="isProcessing"
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
    <b-modal
      v-if="selected != null"
      :active.sync="modalEdit"
      :width="360"
      scroll="keep"
    >
      <div class="card">
        <div class="card-content">
          <h3 class="title is-5">แก้ไขสินค้า</h3>
          <p class="subtitle is-6" v-once>{{ selected.description }}</p>
          <form @submit="editItem">
            <b-field label="Barcode">
              <b-input v-model="selected.barcode" maxlength="13"></b-input>
            </b-field>
            <b-field label="Category">
              <b-select
                v-model="selected.category"
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
                rows="2"
                v-model="selected.description"
                maxlength="32"
              ></b-input>
            </b-field>
            <b-field label="Price">
              <b-numberinput
                v-model="selected.price"
                expanded
                controlsPosition="compact"
                min="0"
              />
            </b-field>
            <div class="buttons">
              <b-button
                v-if="selected.barcode != ''"
                type="is-primary"
                native-type="submit"
                :loading="isEditing"
                expanded
                outlined
              >
                แก้ไขข้อมูลของ
                <small>{{ selected.barcode }}</small>
              </b-button>
              <b-button
                v-if="selected.barcode == ''"
                type="is-primary"
                native-type="submit"
                expanded
                disabled
                outlined
              >
                แก้ไข
              </b-button>
            </div>
          </form>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { db } from "../../firebase";

export default {
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
      isEditing: false,
      isProcessing: false,
      selected: null,
      modalEdit: false,
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
      this.isProcessing = true;
      event.preventDefault();
      db.collection("items")
        .add(this.form)
        .then(ref => {
          this.$buefy.snackbar.open({
            message: `Added document with ID: ${ref.id}`,
            type: "is-success",
            actionText: "เรียบร้อย",
            queue: false
          });
          this.getAllItems();
          this.isProcessing = false;
        });
    },
    editItem: function(event) {
      this.isEditing = true;
      event.preventDefault();
      db.collection("items")
        .where("barcode", "==", this.selected.barcode)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            db.collection("items")
              .doc(doc.id)
              .update(this.selected);
            this.$buefy.snackbar.open({
              message: `แก้ไขข้อมูลของ ${this.selected.barcode} สำเร็จแล้ว! <br/> <small>รหัสอ้างอิง ${doc.id}</small>`,
              type: "is-success",
              actionText: "เรียบร้อย",
              duration: 10000,
              queue: false
            });
          });
          this.isEditing = false;
          this.selected = null;
          this.isLoading = false;
        })
        .catch(err => {
          window.console.log("Not found any data..", err);
          this.isEditing = false;
        });
    },
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
    getAllItems: function() {
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
  computed: {
    duplicateData: function() {
      return this.updateform == this.selected;
    }
  },
  mounted() {
    document.title = "สินค้า " + this.$store.state.settings.backend.title;
    this.getAllItems();
  }
};
</script>

<style scoped>
small {
  font-size: 16px;
}
.card {
  border-radius: 4px;
  border-color: #fff;
}

.buttons:not(:last-child) {
  margin-bottom: 0rem;
}
</style>
