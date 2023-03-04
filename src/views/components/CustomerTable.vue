<template>
  <div class="card mb-4">
    <!-- <div class="d-flex align-items-center card-header pb-0">
      <h6>Customers</h6>
      <argon-button @click="clicked" color="success" size="sm" class="ms-auto"
        >Add</argon-button
      >
    </div> -->
    <div class="card-body">
      <p class="text-uppercase text-sm">Customer Information</p>
      <form role="form" @submit.prevent="create_user">
        <div class="row">
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >ID</label
            >
            <argon-input type="text" name="id" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >PASSWORD</label
            >
            <argon-input type="password" name="password" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >STORENAME</label
            >
            <argon-input type="text" name="storename" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >ADDRESS</label
            >
            <argon-input type="text" name="address" value="" />
          </div>
          <div class="text-center">
            <label for="example-text-input" class="form-control-label"
              >Password</label
            >
            <argon-input
              type="password"
              name="confirm_password"
              value=""
              placeholder="confirm password"
            />
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
                  ps-2
                "
              >
                Customer_ID
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
            <tr v-for="item in rowData" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.data().storename }}</td>
              <td>{{ item.data().address }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import { mapActions } from "vuex";

export default {
  name: "customer-table",
  data() {
    return {
      rowData: [],
    };
  },
  components: { ArgonButton, ArgonInput },
  methods: {
    ...mapActions(["register"]),
    async create_user(event) {
      let user = {
        username: event.target.elements.id.value,
        password: event.target.elements.password.value,
        confirm_password: event.target.elements.confirm_password.value,
        email: "riw1232@hotmail.com",
        name: "test123",
        // username: 'test123',
        // password: '12345',
        // confirm_password: '12345',
        // email: 'kamper-fc@hotmail.com',
        // name: 'testest123'
      };
      console.log(user);

      this.register(user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/customer");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.customer-table {
  max-height: 300px;
}
</style>
