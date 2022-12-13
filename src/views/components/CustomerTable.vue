<template>
  <div class="card mb-4">
    <div class="d-flex align-items-center card-header pb-0">
      <h6>Customers</h6>
      <argon-button @click="clicked" color="success" size="sm" class="ms-auto"
        >Add</argon-button
      >
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
                ID
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  ps-2
                "
              >
                Storename
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  ps-2
                "
              >
                Email
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
                Address
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
import ArgonButton from "@/components/ArgonButton.vue";
export default {
  name: "customer-table",
  components: {ArgonButton},
  methods: {
    clicked(event){
        console.log(event);
    }
  }
};
</script>

<style scoped>
 .customer-table{
    max-height: 300px;
 }
</style>
