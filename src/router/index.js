import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
// import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Stock from "../views/Stock.vue";
import Customer from "../views/Customer.vue";
import Invoice from "../views/Invoice.vue"
import store from "../store";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: "/invoice",
    name: "Invoice",
    component: Invoice,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: "/stock",
    name: "Stock",
    component: Stock,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: "/customer",
    name: "Customer",
    component: Customer,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: {
      requiresGuest: true,
      requiresAdmin: false,
    },
  },
  // {
  //   path: "/signup",
  //   name: "Signup",
  //   component: Signup,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
 if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedin) {
      next("/signin");
    } else {
      if (to.matched.some((record) => record.meta.requiresAdmin)) {
        if (store.getters.user.role !== "admin") {
          console.log(store.getters.user.role);
          console.log("Not an admin");
          next("/profile");
        }
      }
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (store.getters.isLoggedin) {
      next("/profile");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
