<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <customer-table />
      </div>
    </div>
  </div>
</template>

<script>
import CustomerTable from "./components/CustomerTable.vue";

export default {
  name: "stock",
  components: {
    CustomerTable,
  },
  data() {
    return {
    };
  },
};
</script>
