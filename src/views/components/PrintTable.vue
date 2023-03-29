<template>
  <div class="invoice card">
    <div class="d-flex justify-content-between">
      <a class="avatar avatar-lg rounded-circle">
        <img src="../../img/storelogo.jpeg" alt="" />
      </a>
      <h3>Invoice</h3>
      <p class="mb-1 text-sm font-weight-bold">{{ human_date }}</p>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  text-center
                  opacity-7
                  ps-2
                "
              >
                Qty.
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
                Detail
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
                Price/Unit
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
                Amounth
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
                Tax
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in invoice_to_print.order_stock" :key="item._id">
              <td class="align-middle text-center">
                {{ item.orderqty }}
              </td>
              <td class="align-middle text-center">{{ item.detail }}</td>
              <td class="align-middle text-center">
                {{ item.priceperu }}
              </td>
              <td class="align-middle text-center">
                {{ item.priceperu * item.orderqty }}
              </td>
              <td class="align-middle text-center">
                0
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <table align="right" class="m-right-1">
          <tr>
            <td>
              <p class="mb-1 text-sm font-weight-bold">
                Total Qty: {{ result.qty }}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p class="mb-1 text-sm font-weight-bold">
                Total: {{ result.sum }}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p class="mb-1 text-sm font-weight-bold">
                Total(with tax): {{ result.sum_with_tax }}
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "print-table",
  components: {},
  props: {
    invoice_to_print: {
      Object,
    },
  },
  data() {
    return {
      result: {
        sum: 0,
        sum_with_tax: 0,
        qty: 0,
      },
    };
  },
  computed: {
    invoice() {
      return this.$props.invoice_to_print;
    },
    human_date() {
      let req_date = this.invoice_to_print.date_issued;
      let date = req_date.split("T")[0];
      let time = req_date.split("T")[1].split(".")[0];
      return `${date} ${time}`;
    },
  },
  created() {
    console.log(this.invoice_to_print);
    let sum = 0;
    let sum_with_tax = 0;
    let qty = 0;
    this.invoice_to_print.order_stock.forEach((item) => {
      qty += item.orderqty;
      sum += item.priceperu * item.orderqty;
      sum_with_tax += item.priceperu * 1 * item.orderqty;
    });
    this.result.sum = sum;
    this.result.sum_with_tax = sum_with_tax;
    this.result.qty = qty;
  },
  methods: {},
};
</script>

<style>
.invoice {
  padding-top: 50px;
  padding-right: 30px;
  padding-bottom: 50px;
  padding-left: 30px;
}
</style>

    