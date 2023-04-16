<template>
  <div class="card">
    <div class="p-3 pt-0 text-center card-body">
      <div class="container">
        <img
          v-bind:src="`http://localhost:9000/api/images/${item_info.imagename}`"
          alt="Rounded image"
          class="img-fluid rounded shadow mt-3"
          aria-hidden="true"
        />
      </div>
      <div class="content">
        <h6 class="mb-0 text-center pt-2">{{ item_info.detail }}</h6>
        <!-- <span class="text-xs">{{ desc }}</span> -->
        <span class="text-xs">test description</span>
        <hr class="my-3 horizontal dark" />
        <h5 class="mb-0">${{ item_info.priceperu }}</h5>
        <br />
        <argon-button
          v-if="item_info.qty != 0"
          @click="selectedInvoice"
          color="success"
          size="sm"
          variant="outline"
          >Add to Invoice</argon-button
        >
        <argon-button v-else-if="item_info.qty == 0" color="danger" size="sm"
          >Out of stock</argon-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
export default {
  name: "item-card",
  components: {
    ArgonButton,
  },
  props: {
    icon_bg: {
      type: String,
      default: "bg-white",
    },
    item_info: {
      type: Object,
    },
  },
  methods: {
    selectedInvoice() {
      this.$emit("selected-invoice", this.item_info);
    },
  },
};
</script>
<style>
.container {
  width: 200px;
  height: 200px;
}
.container img {
  max-height: 100%;
  max-width: 100%;
}
.content {
  margin: 5%;
}
</style>