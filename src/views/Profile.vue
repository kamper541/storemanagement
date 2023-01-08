<template>
  <main>
    <div class="py-4 container-fluid">
      <div class="row min-height-200">
        <div class="col">
          <div class="card">
            <form role="form" @submit.prevent="handleupdateprofile">
              <div class="card-header pb-0">
                <div class="d-flex align-items-center">
                  <p class="mb-0">Edit Profile</p>
                </div>
              </div>
              <div class="card-body">
                <p class="text-uppercase text-sm">User Information</p>
                <div class="row">
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                      >Storename</label
                    >
                    <argon-input
                      type="text"
                      :value="info.storename"
                      name="storename"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                      >Email address</label
                    >
                    <argon-input
                      type="email"
                      :value="info.email"
                      name="email"
                      :isDisabled="true"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                      >First name</label
                    >
                    <argon-input
                      type="text"
                      :value="info.firstname"
                      name="firstname"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                      >Last name</label
                    >
                    <argon-input
                      type="text"
                      :value="info.lastname"
                      name="lastname"
                    />
                  </div>
                </div>
                <hr class="horizontal dark" />
                <p class="text-uppercase text-sm">Contact Information</p>
                <div class="row">
                  <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label"
                      >Address</label
                    >
                    <argon-input
                      type="text"
                      :value="info.address"
                      name="address"
                    />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >City</label
                    >
                    <argon-input type="text" :value="info.city" name="city" />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >Country</label
                    >
                    <argon-input
                      type="text"
                      :value="info.country"
                      name="country"
                    />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >Postal code</label
                    >
                    <argon-input
                      type="text"
                      :value="info.postalcode"
                      name="postalcode"
                    />
                  </div>
                </div>
                <hr class="horizontal dark" />
                <p class="text-uppercase text-sm">About me</p>
                <div class="row">
                  <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label"
                      >About me</label
                    >
                    <argon-input
                      type="text"
                      :value="info.aboutme"
                      name="aboutme"
                      :isDisabled="true"
                    />
                  </div>
                </div>
              </div>
              <div class="text-center">
                <argon-button color="success" size="sm" class="mb-4 mx-auto"
                  >Save</argon-button
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebase";

import { doc, onSnapshot, setDoc } from "firebase/firestore";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "profile",
  data() {
    return {
      showMenu: false,
      info: {
        storename: "",
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        country: "",
        postalcode: "",
        aboutme: "",
      },
    };
  },
  components: { ArgonInput, ArgonButton },
  async created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
          console.log("Current data: ", doc.data());
          const storeinfo = doc.data();
          this.info.storename = storeinfo.storename;
          this.info.email = user.email;
          this.info.firstname = storeinfo.firstname;
          this.info.lastname = storeinfo.lastname;
          this.info.address = storeinfo.address;
          this.info.city = storeinfo.city;
          this.info.country = storeinfo.country;
          this.info.postalcode = storeinfo.postalcode;
          this.info.aboutme = storeinfo.aboutme;
        });
      } else {
        this.$router.push("/signin").catch(() => {});
      }
    });
  },
  methods: {
    async handleupdateprofile(event) {
      event.preventDefault();
      const auth = getAuth();

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        storename: event.target.elements.storename.value,
        firstname: event.target.elements.firstname.value,
        lastname: event.target.elements.lastname.value,
        address: event.target.elements.address.value,
        city: event.target.elements.city.value,
        country: event.target.elements.country.value,
        postalcode: event.target.elements.postalcode.value,
        aboutme: event.target.elements.aboutme.value,
      });

      // console.log(auth.currentUser.uid);
      alert("Profile Updated");
    },
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeMount() {
    this.$store.state.imageLayout = "profile-overview";
    this.$store.state.showNavbar = false;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = true;
    body.classList.add("profile-overview");
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    this.$store.state.imageLayout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = false;
    body.classList.remove("profile-overview");
  },
};
</script>
