<template>
  <section>
    <h1 class="title is-3">ประวัติการขายที่บันทึกไว้</h1>
    <p class="subtitle is-4">การขายทั้งหมดที่การบันทึกไว้</p>
    <b-table
      :data="history"
      detailed
      hoverable
      :default-sort="['barcode', 'asc']"
      detail-key="name"
      narrowed
    >
      <template slot-scope="props">
        <b-table-column field="date" label="เวลาที่ขาย" width="300" sortable>
          {{
            "ขายวันที่ " +
              new Date(props.row.date.seconds * 1000).toLocaleDateString(
                "th-TH"
              ) +
              " " +
              new Date(props.row.date.seconds * 1000).toLocaleTimeString(
                "th-TH"
              ) +
              " น."
          }}
        </b-table-column>

        <b-table-column
          field="sold"
          label="สินค้าที่ขาย"
          width="300"
          sortable
          centered
        >
          {{ props.row.sold.length }} ชิ้น
        </b-table-column>

        <b-table-column
          field="totalprice"
          label="ราคาขาย"
          width="100"
          sortable
          centered
        >
          {{ props.row.totalprice }}
        </b-table-column>

        <b-table-column
          field="sold_by"
          label="ขายโดย"
          width="300"
          sortable
          centered
        >
          {{ props.row.sold_by }}
        </b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <tr v-for="(item, index) in props.row.sold" :key="index">
          <td>#{{ index + 1 }}</td>
          <td>{{ item.barcode }}</td>
          <td class="has-text-centered">
            {{ item.description }}
          </td>
          <td class="has-text-centered">
            {{ item.category }}
          </td>
          <td class="has-text-centered">
            {{ item.price }}
          </td>
        </tr>
      </template>
    </b-table>
  </section>
</template>

<script>
import { db } from "../../firebase";
export default {
  data() {
    return {
      history: [],
      showDetailIcon: true
    };
  },
  methods: {
    getAllHistory: function() {
      db.collection("sale_history")
        .get()
        .then(querySnapshot => {
          this.history = querySnapshot.docs.map(doc => doc.data());
          window.console.log(this.history);
        })
        .catch(err => {
          window.console.log("Not found..", err);
        });
    }
  },
  computed: {},
  mounted() {
    document.title =
      "ประวัติการขาย " + this.$store.state.settings.backend.title;
    this.getAllHistory();
  }
};
</script>

<style scoped></style>
