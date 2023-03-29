<template>
  <main>
    <div class="py-4 container-fluid" v-if="user">
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
                      :value="user.storename"
                      name="storename"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                      >Email address</label
                    >
                    <argon-input
                      type="email"
                      :value="user.email"
                      name="email"
                      :isDisabled="true"
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
                      :value="user.address"
                      name="address"
                    />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >City</label
                    >
                    <argon-input type="text" :value="user.city" name="city" />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >Country</label
                    >
                    <argon-input
                      type="text"
                      :value="user.country"
                      name="country"
                    />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label"
                      >Postal code</label
                    >
                    <argon-input
                      type="text"
                      :value="user.postalcode"
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
                      :value="user.role"
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
import { mapActions, mapGetters } from "vuex";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "profile",
  data() {
    return {
      showMenu: false,
    };
  },
  components: { ArgonInput, ArgonButton },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile", "updateUser"]),
    async handleupdateprofile(event) {
      if (this.user) {
        let updatedUser = {
          id: this.user._id,
          storename: event.target.elements.storename.value,
          address: event.target.elements.address.value,
          city: event.target.elements.city.value,
          country: event.target.elements.country.value,
          postalcode: event.target.elements.postalcode.value,
        };
        this.updateUser(updatedUser)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        alert("Profile Updated");
      }
    },
  },
  created() {
    this.getProfile();
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
