<template>
  <div class="card">
    <div class="p-3 pt-0 text-center card-body" style="height: 25rem;">
      <img
        src="../../img/storelogo.jpeg"
        alt="Rounded image"
        class="img-fluid rounded shadow pt-3"
        style="width: 75%"
        aria-hidden="true"
      />
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
        data-bs-toggle="modal"
        data-bs-target="#actionModal"
        >Add to Invoice</argon-button
      >
      <p v-else-if="item_info.qty == 0" class="text-danger">Out of stock</p>
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
        type: Object
    },
  },
  methods: {
    selectedInvoice(){
        this.$emit('selected-invoice', this.item_info)
    }
  }
};
</script>