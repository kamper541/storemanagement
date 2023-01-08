<template>
  <div class="card mb-4">
    <div class="d-flex align-items-center card-header pb-0">
      <h6>Customers</h6>
      <argon-button @click="clicked" color="success" size="sm" class="ms-auto"
        >Add</argon-button
      >
    </div>
    <div class="card-body">
      <p class="text-uppercase text-sm">Customer Information</p>
      <form role="form" @submit.prevent="handlesubmit">
        <div class="row">
          <!-- <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >ID</label
            >
            <argon-input type="text" name="ID" value="" />
          </div> -->
          <div class="col-md-6">
            <label for="example-text-input" class="form-control-label"
              >EMAIL</label
            >
            <argon-input type="text" name="email" value="" />
          </div>
          <div class="col-md-3">
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
            <tr v-for="item in rowData" :key="item.id">
              <td>{{ item.email }}</td>
              <td>{{ item.storename }}</td>
              <td>{{ item.address }}</td>
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

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { db } from "../../Firebase";

import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

export default {
  name: "customer-table",
  data() {
    return {
      rowData: [],
    };
  },
  mounted() {
    const q = query(
      collection(db, "users"),
      where("aboutme", "==", "customer")
    );
    onSnapshot(q, (querySnapshot) => {
      const customers = [];
      querySnapshot.forEach((doc) => {
        customers.push(doc.data());
      });
      this.rowData = customers;
    });
  },
  components: { ArgonButton, ArgonInput },
  methods: {
    async handlesubmit(event) {
      event.preventDefault();

      const auth = getAuth()
      createUserWithEmailAndPassword(
        auth,
        event.target.elements.email.value,
        event.target.elements.password.value
      ).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
      });

      const docRef = await addDoc(collection(db, "users"), {
        storename: event.target.element.storename.value,
        address: event.target.element.address.value,
      });
      alert("Item has been added to the stock");
      console.log("Document written with ID: ", docRef.id);
    },
  },
};
</script>

<style scoped>
.customer-table {
  max-height: 300px;
}
</style>
