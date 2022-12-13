<template>
  <div class="card mb-4">
    <div class="d-flex align-items-center card-header pb-0">
      <h6>Stock</h6>
      <argon-button color="success" size="sm" class="ms-auto">Add</argon-button>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            
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
//   setup() {
//     const headers: Header[] = [
//       { text: "Detail", value: "detail", sortable: true },
//       { text: "Barcode ID", value: "id", sortable: true },
//       { text: "BE ID", value: "beid", sortable: true },
//       { text: "Discount (amount)", value: "dcount", sortable: true },
//       { text: "Discount (%)", value: "dcountper", sortable: true },
//       { text: "JM ID", value: "jmid", sortable: true },
//       { text: "Quantities", value: "qty", sortable: true },
//     ];
//     const items: Item[] = [

//     ];
//     return {
//         headers,
//         items
//     };
//   }
};
</script>

<style scoped>
.stock-table {
  max-height: 300px;
}
</style>
