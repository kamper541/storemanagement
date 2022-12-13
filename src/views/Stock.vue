<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <stock-table />
      </div>
    </div>
  </div>
</template>

<script>
import StockTable from "./components/StockTable.vue";

export default {
  name: "stock",
  components: {
    StockTable,
  },
  data() {
    return {
    };
  },
};
</script>
