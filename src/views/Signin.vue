<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your ID and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="handlesubmit">
                    <div class="mb-3">
                      <argon-input
                        type="text"
                        placeholder="ID"
                        name="ID"
                        id="ID"
                        size="lg"
                      />
                    </div>
                    <div class="mb-3">
                      <argon-input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        size="lg"
                      />
                    </div>
                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        >Sign in</argon-button
                      >
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a class="text-success text-gradient font-weight-bold"
                      >Please contact admin.</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   onAuthStateChanged
// } from "firebase/auth";

import { mapActions } from "vuex";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  data() {
    return {
      ID: "",
      password: "",
    };
  },
  components: {
    ArgonInput,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");

    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     this.$router.push("/profile").catch(() => {})
    //   }
    // })
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapActions(["login"]),
    handlesubmit(event) {
      console.log(
        event.target.elements.ID.value,
        event.target.elements.password.value
      );
      let user = {
        username: event.target.elements.ID.value,
        password: event.target.elements.password.value,
      };
      this.login(user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // async create_user() {
    //   let user = {
    //     // username: event.target.elements.id.value,
    //     // password: event.target.elements.password.value,
    //     // confirm_password: event.target.elements.confirm_password.value,
    //     // email: "kamper-fc@hotmail.com",
    //     // name: "test123",
    //     username: "test123",
    //     password: "12345",
    //     confirm_password: "12345",
    //     email: "kamper-fc@hotmail.com",
    //     name: "testest123",
    //   };
    //   console.log(user);

    //   this.register(user).then((res) => {
    //     console.log(res);
    //     if (res.data.success) {
    //       this.$router.push("/customer");
    //     }
    //   });
    //   // .catch((err) => {
    //   //   console.log(err);
    //   // });
    // },
  },
};
</script>
