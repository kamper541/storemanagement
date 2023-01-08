<template>
  <div class="card mb-4">
    <div class="d-flex align-items-center card-header pb-0">
      <h6>Stock</h6>
    </div>

    <div class="card-body">
      <p class="text-uppercase text-sm">Item Information</p>
      <form role="form" @submit.prevent="handlesubmit">
        <div class="row">
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >DETAIL</label
            >
            <argon-input type="text" name="detail" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >BARCODEID</label
            >
            <argon-input type="text" name="barid" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >BE ID</label
            >
            <argon-input type="text" name="beid" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >DISCOUNT (Amount)</label
            >
            <argon-input type="number" name="disc" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >DISCOUNT (%)</label
            >
            <argon-input type="number" name="discper" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >JM ID</label
            >
            <argon-input type="text" name="jmid" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >QUANTITIES</label
            >
            <argon-input type="number" name="qty" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >PRICE/UNIT</label
            >
            <argon-input type="number" name="priceperu" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-checkbox-input" class="form-control-label"
              >TAX ACTIVE?</label
            >
            <argon-input type="text" name="taxactive" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >ACTIVE</label
            >
            <argon-input type="text" name="action" value="" />
          </div>
        </div>
        <div class="text-center">
          <argon-button color="success" size="sm" class="mb-4 mx-auto"
            >Add</argon-button
          >
        </div>
      </form>
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
import ArgonInput from "@/components/ArgonInput.vue";

import { db } from "../../Firebase";

import { collection, onSnapshot, addDoc } from "firebase/firestore";

export default {
  name: "stock-table",
  components: { ArgonButton, ArgonInput },
  data() {
    return {
      rowData: [],
    };
  },
  mounted() {
    const q = collection(db, "stock")
    onSnapshot(q, (querySnapshot) =>{
      const stock = []
      querySnapshot.forEach((doc) => {
        stock.push(doc.data())
      })
      this.rowData = stock
    })
  },
  methods: {
    async handlesubmit(event) {
      event.preventDefault();
      const docRef = await addDoc(collection(db, "stock"), {
        detail: event.target.elements.detail.value,
        barid: event.target.elements.barid.value,
        beid: event.target.elements.beid.value,
        disc: event.target.elements.disc.value,
        discper: event.target.elements.discper.value,
        jmid: event.target.elements.jmid.value,
        qty: event.target.elements.qty.value,
        priceperu: event.target.elements.priceperu.value,
        taxactive: event.target.elements.taxactive.value,
        action: event.target.elements.action.value,
      });
      alert("Item has been added to the stock");
      console.log("Document written with ID: ", docRef.id);
    },
  },
};
</script>

<style scoped>
.stock-table {
  max-height: 720px;
}
</style>
