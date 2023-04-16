<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <h6 class="mb-0">Invoices</h6>
        </div>
        <div class="col-6 text-end">
          <argon-button
            color="success"
            size="sm"
            variant="outline"
            data-bs-toggle="modal"
            data-bs-target="#addInvoiceModal"
            >Add Invoice</argon-button
          >
        </div>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Store
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Note
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Status
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Date Issued
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in display_invoices" :key="invoice.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">
                      {{ invoice.storename }}
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">
                  {{ invoice.note }}
                </p>
                <p class="text-xs text-secondary mb-0">
                  {{ invoice.description }}
                </p>
              </td>
              <td class="align-middle text-center text-sm">
                <span
                  class="badge badge-sm bg-gradient-warning"
                  v-if="invoice.status == 'pending'"
                  >{{ invoice.status }}</span
                >
                <span
                  class="badge badge-sm bg-gradient-success"
                  v-if="invoice.status == 'confirmed'"
                  >{{ invoice.status }}</span
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  invoice.date_issued
                }}</span>
              </td>
              <td class="align-middle">
                <a
                  v-if="invoice.status == 'pending'"
                  v-on:click="viewInvoice(invoice)"
                  class="text-muted font-weight-bold text-xs button"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  data-bs-toggle="modal"
                  data-bs-target="#invoiceModal"
                  >Confirm</a
                >
                <a
                  v-if="invoice.status == 'confirmed'"
                  v-on:click="viewInvoice(invoice)"
                  class="text-muted font-weight-bold text-xs button"
                  >View Invoice</a
                >
                <a
                  v-if="
                    (invoice.status == 'confirmed') & (user.role == 'admin')
                  "
                  v-on:click="viewOrder(invoice)"
                  class="text-muted font-weight-bold text-xs button"
                  >View Order</a
                >
              </td>
            </tr>
          </tbody>
        </table>
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
            <div>
              <h3 class="text-center">Invoice Table</h3>
            </div>
            <div
              class="table-responsive p-0 table-wrapper-scroll-y my-custom-scrollbar"
            >
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
                    >
                      Qty.
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
                    >
                      Detail
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
                    >
                      Price/Unit
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
                    >
                      Amount
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
                    >
                      Tax
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in selected_view_invoice_order.order_stock"
                    :key="item._id"
                  >
                    <td class="align-middle text-center">
                      {{ item.orderqty }}
                    </td>
                    <td class="align-middle text-center">{{ item.detail }}</td>
                    <td class="align-middle text-center">
                      {{ item.priceperu }}
                    </td>
                    <td class="align-middle text-center">
                      {{
                        (item.priceperu + item.priceperu * item.taxactive) *
                        item.orderqty
                      }}
                    </td>
                    <td class="align-middle text-center">
                      {{ item.taxactive }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <br />
            </div>
            <table align="right" class="mb-0">
              <tr>
                <td>
                  <p class="mb-1 text-sm font-weight-bold">
                    Qty: {{ sum.qty }}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="mb-1 text-sm font-weight-bold">
                    Total: {{ sum.total }}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="mb-1 text-sm font-weight-bold">
                    Total (With Tax): {{ sum.total_with_tax }}
                  </p>
                </td>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn bg-gradient-success"
              v-on:click="confirmInvoice"
            >
              Confirm Invoice
            </button>
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
    <!-- Add invoice modal -->
    <div
      class="modal fade"
      id="addInvoiceModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addInvoiceModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-normal" id="addInvoiceModal">
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
          <form role="form" @submit.prevent="addInvoice">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >Note</label
                  >
                  <argon-input type="text" name="note" value="" />
                </div>
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >Description</label
                  >
                  <argon-input type="text" name="description" value="" />
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
              <button type="submit" class="btn bg-gradient-success">
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- pdf section -->
  <div v-if="print" ref="print_component">
    <PrintInvoice
      id="invoice-content"
      v-bind:invoice_to_print="selected_view_invoice_order"
    />
  </div>
  <div v-if="print & (user.role == 'admin')" ref="print_component">
    <print-table
      id="order-content"
      v-bind:invoice_to_print="selected_view_invoice_order"
    />
  </div>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";
import PrintTable from "./PrintTable.vue";
import PrintInvoice from "./PrintInvoiceTable.vue";
import { nextTick } from "vue";
import html2pdf from "html2pdf.js";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "../../components/ArgonInput.vue";

export default {
  name: "invoice-table",
  components: { PrintTable, ArgonButton, ArgonInput, PrintInvoice },
  data() {
    return {
      modal_on: false,
      selected_view_invoice_order: {},
      print: false,
      sum: {
        qty: 0,
        total: 0,
        total_with_tax: 0,
      },
      // display_invoices: [],
    };
  },
  computed: {
    ...mapGetters(["user_invoices", "invoices", "user"]),
    display_invoices() {
      if (this.user.role == "admin") {
        console.log(this.invoices);
        return this.invoices;
      } else if (this.user.role == "user") {
        return this.user_invoices;
      }else{
        return []
      }
    },
  },
  methods: {
    ...mapActions([
      "get_invoices",
      "confirm_invoice",
      "add_invoice",
      "getProfile",
      "get_idv_invoices",
    ]),
    toggle_modal() {
      console.log(this.modal);
      this.modal = !this.modal;
    },
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    hasGenerated() {
      alert("PDF generated successfully!");
    },
    async generateReport(content) {
      this.print = true;
      await nextTick();
      this.$refs.print_component.focus();
      html2pdf(document.getElementById(content), {
        margin: 1,
        filename: "invoice.pdf",
      });
      await nextTick();
      this.print = false;
    },
    domRendered() {
      console.log("Dom Has Rendered");
    },
    viewOrder(invoice_info) {
      this.selected_view_invoice_order = invoice_info;
      this.generateReport("order-content");
    },
    viewInvoice(invoice_info) {
      this.selected_view_invoice_order = invoice_info;
      if (invoice_info.status == "pending") {
        console.log("View Invoice: ", invoice_info);
        this.sum.qty = 0;
        this.sum.total = 0;
        this.sum.total_with_tax = 0;
        this.selected_view_invoice_order.order_stock.forEach((item) => {
          this.sum.qty += item.orderqty;
          this.sum.total += item.priceperu * item.orderqty;
          this.sum.total_with_tax +=
            (item.priceperu + item.priceperu * item.taxactive) * item.orderqty;
        });
      } else if (invoice_info.status == "confirmed") {
        console.log(this.selected_view_invoice_order);
        this.generateReport("invoice-content");
      }
    },
    confirmInvoice() {
      this.confirm_invoice(this.selected_view_invoice_order._id);
      alert(`${this.selected_view_invoice_order._id} Invoice Confirmed.`);
      this.$forceUpdate();
    },
    addInvoice(event) {
      let dataForm = {
        customer_id: this.user._id,
        note: event.target.elements.note.value,
        description: event.target.elements.description.value,
        order_stock: [],
      };
      this.add_invoice(dataForm);
      alert("Invoice Added");
      if (this.user.role == "admin") {
        this.get_invoices();
        this.display_invoices = this.invoices;
      } else {
        console.log(this.user._id);
        this.get_idv_invoices(this.user._id);
        this.display_invoices = this.user_invoices;
      }
      this.$forceUpdate();
    },
  },
  created() {
    this.getProfile();
    if (this.user.role == "admin") {
      this.get_invoices();
    } else if (this.user.role == "user"){
      this.get_idv_invoices(this.user._id);
    }
  },
};
</script>

<style>
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
.my-custom-scrollbar {
  height: 30vh;
  overflow: auto;
}
.table-wrapper-scroll-y {
  display: block;
}
</style>
  