<template>
  <div class="card mb-4">
    <div class="d-flex align-items-center card-header pb-0">
      <h6>Stock</h6>
    </div>

    <!-- Add Stock -->
    <div class="card-body" v-if="user.role == 'admin'">
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
              >TAX ACTIVE</label
            >
            <argon-input type="text" name="taxactive" valeue="" />
          </div>
          <div class="col-md-6">
            <label for="formFile" class="form-control-label">image</label>
            <div class="form-group">
              <argon-input type="file" name="image" @change="onFileSelected" />
            </div>
          </div>
        </div>
        <div class="text-center">
          <argon-button color="success" size="sm" class="mb-4 mx-auto"
            >Add</argon-button
          >
        </div>
      </form>
    </div>
    <!-- Old Stock Table -->
    <div class="card-body px-0 pt-0 pb-2">
      <div class="stock-table table-responsive p-0">
        <table class="table align-items-center mb-0">
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
            <tr v-for="item in stock" :key="item.id">
              <td class="align-middle text-center">{{ item.detail }}</td>
              <td class="align-middle text-center">{{ item.barid }}</td>
              <td class="align-middle text-center">{{ item.beid }}</td>
              <td class="align-middle text-center">{{ item.disc }}</td>
              <td class="align-middle text-center">{{ item.discper }}</td>
              <td class="align-middle text-center">{{ item.jmid }}</td>
              <td class="align-middle text-center">{{ item.qty }}</td>
              <td class="align-middle text-center">{{ item.priceperu }}</td>
              <td class="align-middle text-center">{{ item.taxactive }}</td>
              <td>
                <a
                  v-if="item.qty != 0"
                  v-on:click="setSelected(item)"
                  class="text-success font-weight-bold text-xs button"
                  data-bs-toggle="modal"
                  data-bs-target="#actionModal"
                  >Add</a
                >
                <a v-else class="text-danger font-weight-bold text-xs"
                  >Out of Stock</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Add Item Modal -->
      <div
        class="modal fade"
        id="actionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="actionModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title font-weight-normal" id="actionModalLabel">
                Add Item
              </h5>
              <button
                type="button"
                class="btn-close text-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form role="form" @submit.prevent="addItem">
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label"
                      >Detail</label
                    >
                    <argon-input
                      :isDisabled="true"
                      type="text"
                      name="detail"
                      :value="selectedItem.detail"
                    />
                  </div>
                  <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label"
                      >BARCODEID</label
                    >
                    <argon-input
                      :isDisabled="true"
                      type="text"
                      name="barid"
                      :value="selectedItem.barid"
                    />
                  </div>
                  <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label"
                      >PRICE/UNIT</label
                    >
                    <argon-input
                      :isDisabled="true"
                      type="number"
                      name="priceperu"
                      :value="String(selectedItem.priceperu)"
                    />
                  </div>
                  <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label"
                      >QTY</label
                    >
                    <argon-input
                      :isDisabled="true"
                      type="number"
                      name="priceperu"
                      :value="String(selectedItem.qty)"
                    />
                  </div>
                  <div class="text-center">
                    <label
                      for="example-checkbox-input"
                      class="form-control-label"
                      >Order Qty</label
                    >
                    <argon-input
                      class=""
                      type="number"
                      name="orederqty"
                      :value="1"
                      :min="1"
                      :max="selectedItem.qty"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn bg-gradient-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn bg-gradient-success"
                  data-bs-toggle="modal"
                  data-bs-target="#invoiceModal"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- Invoice Modal -->
      <div
        class="modal fade"
        id="invoiceModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="invoiceModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title font-weight-normal" id="invoiceModalLabel">
                Choose invoice to add
              </h5>
              <button
                type="button"
                class="btn-close text-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div v-for="invoice in user_invoices" :key="invoice.id">
                <a
                  v-if="invoice.status == 'pending'"
                  class="dropdown-item border-radius-md choose"
                  v-on:click="addToInvoice(invoice)"
                  data-bs-dismiss="modal"
                >
                  <div class="py-1 d-flex">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold">{{ invoice.note }}</span
                        >:
                        {{ invoice.description }}
                      </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        {{ invoice.date_issued }}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn bg-gradient-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex flex-wrap">
    <div v-for="item in stock" :key="item._id" class="col-md-3 p-1">
      <item-card :item_info="item" @selected-invoice="setSelected" />
    </div>
  </div>
</template>

<script>
import ArgonButton from "../../components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import { mapActions, mapGetters } from "vuex";
import ItemCard from "./ItemCard.vue";
import axios from "axios";

// import { db } from "../../Firebase";

// import { collection, onSnapshot, addDoc } from "firebase/firestore";

export default {
  name: "stock-table",
  components: { ArgonButton, ArgonInput, ItemCard },
  data() {
    return {
      rowData: [],
      selectedItem: {},
      pending_invoices: [],
      image: null,
    };
  },
  computed: mapGetters(["stock", "user", "user_invoices"]),
  methods: {
    ...mapActions([
      "get_stock",
      "add_stock",
      "get_idv_invoices",
      "update_item_in_invoice",
      "upload_image",
    ]),
    onFileSelected(event) {
      this.image = event.target.files[0];
      console.log(this.image);
    },
    async getImage(imagename){
      let res = await axios.post(`http://localhost:9000/image/${imagename}`)
      console.log(res);
      return res
    },
    async handlesubmit(event) {
      event.preventDefault();
      // stock
      let docRef = {
        detail: event.target.elements.detail.value,
        barid: event.target.elements.barid.value,
        beid: event.target.elements.beid.value,
        disc: event.target.elements.disc.value,
        discper: event.target.elements.discper.value,
        jmid: event.target.elements.jmid.value,
        qty: event.target.elements.qty.value,
        priceperu: event.target.elements.priceperu.value,
        taxactive: event.target.elements.taxactive.value,
        imagename: this.image.name,
      };
      // this.add_stock(docRef);

      // image
      const fd = new FormData();
      fd.append("file", this.image);
      console.log(fd);
      this.upload_image(fd);
      alert("Item has been added to the stock");
      console.log("Document written with ID: ", docRef.barid);
    },
    setSelected(item) {
      console.log(item);
      this.selectedItem = item;
      console.log("Get Invoice of user ", this.user._id);
    },
    addItem(event) {
      this.selectedItem.orderqty = event.target.elements.orederqty.value;
    },
    addToInvoice(invoice) {
      const updateInvoice = {
        invoice: invoice,
        item: {
          detail: this.selectedItem.detail,
          barid: this.selectedItem.barid,
          beid: this.selectedItem.beid,
          disc: this.selectedItem.disc,
          discper: this.selectedItem.discper,
          jmid: this.selectedItem.jmid,
          orderqty: Number(this.selectedItem.orderqty),
          priceperu: this.selectedItem.priceperu,
          taxactive: this.selectedItem.taxactive,
        },
      };
      this.update_item_in_invoice(updateInvoice);
      alert(`Adding ${this.selectedItem.detail} to Invoice ${invoice.note}`);
    },
  },
  created() {
    this.get_stock();
    console.log(this.user._id);
    this.get_idv_invoices(this.user._id);
  },
};
</script>

<style scoped>
.stock-table {
  max-height: 720px;
}
.button {
  text-decoration: none;
  background-color: white;
  border: 2px solid white;
  color: white;
  display: inline-block;
  font-size: 1.5em;
  padding: 8px;
  transition: 0.35s;
}
.button:hover {
  cursor: pointer;
}

.choose {
  cursor: pointer;
}
</style>
