<template>
  <div class="card mb-4">
    <div class="d-flex align-items-center card-header pb-0">
      <h6>Stock</h6>
      <argon-button @click="addItem" color="success" size="sm" class="ms-auto">Add</argon-button>
    </div>

    <div class="card-body px-0 pt-0 pb-2">
      <div class="stock-table table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                Detail
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  ps-2
                "
              >
                BarcodeID
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  ps-2
                "
              >
                BE ID
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  text-center
                  opacity-7
                  ps-2
                "
              >
                Discount (amount)
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  text-center
                  opacity-7
                  ps-2
                "
              >
                Discount (%)
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  text-center
                  opacity-7
                  ps-2
                "
              >
                JM ID
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  text-center
                  opacity-7
                  ps-2
                "
              >
                Quantities
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  text-center
                  opacity-7
                  ps-2
                "
              >
                Price/unit
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  text-center
                  opacity-7
                  ps-2
                "
              >
                Tax active ?
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  text-center
                  opacity-7
                  ps-2
                "
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in rowData" :key="item.id">
              <td>{{ item.detail }}</td>
              <td>{{ item.barid }}</td>
              <td>{{ item.beid }}</td>
              <td>{{ item.disc }}</td>
              <td>{{ item.discper }}</td>
              <td>{{ item.jmid }}</td>
              <td>{{ item.qty }}</td>
              <td>{{ item.priceperu }}</td>
              <td>{{ item.taxactive }}</td>
              <td>{{ item.action }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "../../components/ArgonButton.vue";

export default {
  name: "stock-table",
  components: { ArgonButton },
  data() {
    return {
      detail: "this.detail",
      barid: "this.barid",
      beid: "this.beid",
      disc: "this.disc",
      discper: "this.discper",
      jmid: "this.jmid",
      qty: "this.qty",
      priceperu: "this.priceperu",
      taxactive: "this.taxactive",
      action: "this.action",
      rowData: [],
    };
  },
  methods: {
    addItem() {
        let myObject = {
          detail: this.detail,
          barid: this.barid,
          beid: this.beid,
          disc: this.disc,
          discper: this.discper,
          jmid: this.jmid,
          qty: this.qty,
          priceperu: this.priceperu,
          taxactive: this.taxactive,
          action: this.action,
      //     // detail: this.detail,
      //     // barid: this.barid,
      //     // beid: this.beid,
      //     // disc: this.disc,
      //     // discper: this.discper,
      //     // jmid: this.jmid,
      //     // qty: this.qty,
        };
        this.rowData.push(myObject);
        console.log("completed");
    },
  },
};
</script>

<style scoped>
.stock-table {
  max-height: 720px;
}
</style>
