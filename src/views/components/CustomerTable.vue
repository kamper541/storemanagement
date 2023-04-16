<template>
  <div class="card mb-4" v-if="users">
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
              >EMAIL</label
            >
            <argon-input type="email" name="email" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >ADDRESS</label
            >
            <argon-input type="text" name="address" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >CITY</label
            >
            <argon-input type="text" name="city" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >COUNTRY</label
            >
            <argon-input type="text" name="country" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >POSTALCODE</label
            >
            <argon-input type="number" name="postalcode" value="" />
          </div>
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >ROLE</label
            >
            <argon-input type="text" name="role" value="" />
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
            <tr v-for="user in users" :key="user._id">
              <td>{{ user._id }}</td>
              <td>{{ user.storename }}</td>
              <td>{{ user.address }}</td>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "customer-table",
  data() {
    return {
      rowData: [],
    };
  },
  components: { ArgonButton, ArgonInput },
  computed: mapGetters(['users']),
  methods: {
    ...mapActions(["register","getUsers"]),
    async create_user(event) {
      let user = {
        username: event.target.elements.id.value,
        password: event.target.elements.password.value,
        storename: event.target.elements.storename.value,
        email: event.target.elements.email.value,
        address: event.target.elements.address.value,
        city: event.target.elements.city.value,
        country: event.target.elements.country.value,
        postalcode: event.target.elements.postalcode.value,
        role: event.target.elements.role.value
      };
      console.log(user);

      this.register(user)
        .then((res) => {
          if (res.data.success) {
            alert("User created!!")
            this.$router.push("/customer");
            this.$forceUpdate()
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getUsers()
  }
};
</script>

<style scoped>
.customer-table {
  max-height: 300px;
}
</style>
