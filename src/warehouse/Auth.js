// import axios from "axios";
// import router from "../router/index";

import axios from "axios";
import router from "../router/index";

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  users: [],
  stock: [],
  status: "",
  invoices: [],
  user_invoices: [],
  error: null,
};

const getters = {
  isLoggedin: (state) => !!state.token,
  authState: (state) => state.status,
  user: (state) => state.user,
  users: (state) => state.users,
  invoices: (state) => state.invoices,
  user_invoices: (state) => state.user_invoices,
  stock: (state) => state.stock,
  error: (state) => state.user,
};

const actions = {
  // Login User
  async login({ commit }, user) {
    commit("auth_request");
    localStorage.removeItem("token");
    try {
      let res = await axios.post("http://localhost:9000/api/users/login", user);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        // Store the token into the localstorage
        localStorage.setItem("token", token);
        // Set the axios defaults
        axios.interceptors.request.use((config) => {
          const token = localStorage.getItem("token");
          config.headers.Authorization = `${token}`;
          return config;
        });
        commit("auth_success", token, user);
      }
      return res;
    } catch (err) {
      commit("auth_error", err);
    }
  },

  // Register User
  async register({ commit }, userData) {
    commit("register_request");
    try{
      let res = await axios.post(
        "http://localhost:9000/api/users/register",
        userData
      );
      console.log(res);
      if (res.data.success) {
        commit("register_success");
      } else {
        commit("register_error", "Error found in resgisteration");
      }
      return res;
    }catch(err){
      commit("register_error", err);
    }
  },

  // Get Profile
  async getProfile({ commit }) {
    commit("profile_request");
    let res = await axios.get(
      // "http://localhost:9000/api/users/profile?cache=" + Date.now()
      "http://localhost:9000/api/users/profile"
    );
    commit("user_profile", res.data.user);
    return res;
  },

  // Get Users
  async getUsers({ commit }) {
    commit("users_request");
    let res = await axios.get("http://localhost:9000/api/users/get_users");
    commit("users_info", res.data.users);
    return res;
  },

  // Update user info
  async updateUser({ commit }, updatedProfile) {
    const {
      id,
      storename,
      address,
      city,
      country,
      postalcode,
    } = updatedProfile;
    commit("update_request");
    let res = await axios.put(`http://localhost:9000/api/users/${id}`, {
      storename,
      address,
      city,
      country,
      postalcode,
    });
    commit("update_profile", res.data.user);
    return res;
  },

  // Logout the user
  async logout({ commit }) {
    console.log("delete: " + localStorage.getItem("token"));
    localStorage.removeItem("token");
    commit("logout");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/signin");
    return;
  },

  // Get the stock
  async get_stock({ commit }) {
    commit("stock_request");
    let res = await axios.get("http://localhost:9000/api/stocks/get_stock");
    commit("get_stock", res.data.stock);
    return res;
  },

  // Add item to the stock
  async add_stock({ commit }, stockData) {
    commit("stock_request");
    let res = await axios.post(
      "http://localhost:9000/api/stocks/add_stock",
      stockData
    );
    if (res.data.success) {
      commit("add_stock");
    }
    return res;
  },

  async upload_image({ commit }, imageFile) {
    commit("uploading_image");
    let res = await axios
      .post("http://localhost:9000/api/upload", imageFile, {})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // if (res.data.success) {
    //   commit("image_uploaded");
    // }
    return res;
  },

  //Create invoice
  async create_invoice({ commit }) {
    commit("creating_invoice");
    let res = await axios.post("localhost:9000/api/invoices/add_invoice");
    if (res.data.success) {
      commit("invoice_created");
    }
    return res;
  },

  // Add invoice
  async add_invoice({ commit }, invoiceData) {
    commit("invoice_request");
    let res = await axios.post(
      "http://localhost:9000/api/invoices/add_invoice",
      invoiceData
    );
    if (res.data.success) {
      commit("invoice_added");
    }
    return res;
  },

  // Get idv invoices
  async get_idv_invoices({ commit }, customer_id) {
    commit("invoice_request");
    console.log(customer_id);
    let res = await axios.get(
      "http://localhost:9000/api/invoices/get_idv_invoices",
      { params: { id: customer_id } }
    );
    if (res.data.success) {
      console.log(res.data);
      commit("user_invoices_recieved", res.data.user_invoices);
    }
    return res;
  },

  async update_item_in_invoice({ commit }, updateInvoice) {
    let { _id } = updateInvoice.invoice;
    let item = updateInvoice.item;
    let res = await axios.put(
      `http://localhost:9000/api/invoices/${_id}`,
      item
    );
    commit("updating_invoice_request");
    if (res.data.status) {
      console.log(res.data);
      commit("invoice_updated");
    }
    return res;
  },

  async order_item({ commit }, updateStock) {
    commit("ordering_stock");
    let res = await axios.put(
      `http://localhost:9000/api/stocks/order`,
      updateStock
    );
    if (res.data.success) {
      console.log(res.data);
      commit("stock_ordered");
    }
    return res;
  },

  // Get all invoices
  async get_invoices({ commit }) {
    commit("invoice_request");
    let res = await axios.get(
      "http://localhost:9000/api/invoices/get_invoices"
    );
    if (res.data.success) {
      commit("invoices_recieved", res.data.invoices);
    }
    return res;
  },

  //Get storename by invoices
  async get_storename_by_invoice({ commit }) {
    commit("storename_request");
    let res = await axios.get("http://localhost:9000/api/invoices/storeinfo");
    if (res.data.success) {
      commit("storename_recieved");
    }
    return res;
  },

  async confirm_invoice({ commit }, id) {
    commit("confirming_invoice");
    let res = await axios.put(
      `http://localhost:9000/api/invoices/confirm_invoice/${id}`
    );
    if (res.data.success) {
      commit("invoice_confirmed");
    }
    return res;
  },
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.status = "success";
  },
  register_request(state) {
    state.status = "loading";
  },
  register_success(state) {
    state.status = "success";
  },
  register_error(state, err) {
    state.error = err.response.data.msg;
  },
  logout(state) {
    state.error = null;
    state.status = "";
    state.token = "";
    state.user = null;
  },
  profile_request(state) {
    state.status = "loading";
  },
  user_profile(state, user) {
    state.user = user;
    state.status = "success";
  },
  stock_request(state) {
    state.status = "loading";
  },
  get_stock(state, stock) {
    state.status = "success";
    state.stock = stock;
  },
  add_stock(state) {
    state.status = "success";
  },
  ordering_stock(state) {
    state.status = "loading";
  },
  stock_ordered(state) {
    state.status = "success";
  },
  uploading_image(state) {
    state.status = "loading";
  },
  image_uploaded(state) {
    state.status = "success";
  },
  users_request(state) {
    state.status = "loading";
  },
  users_info(state, users) {
    state.users = users;
    state.status = "success";
  },
  update_request(state) {
    state.status = "loading";
  },
  update_profile(state, user) {
    state.status = "success";
    state.user = user;
  },
  invoice_request(state) {
    state.status = "loading";
  },
  invoice_added(state) {
    state.status = "success";
  },
  invoices_recieved(state, invoices) {
    state.invoices = invoices;
    state.status = "success";
  },
  updating_invoice_request(state) {
    state.status = "loading";
  },
  invoice_updated(state) {
    state.status = "success";
  },
  creating_invoice(state) {
    state.status = "loading";
  },
  invoice_created(state) {
    state.status = "success";
  },
  confirming_invoice(state) {
    state.status = "loading";
  },
  invoice_confirmed(state) {
    state.status = "success";
  },
  user_invoices_recieved(state, user_invoices) {
    state.user_invoices = user_invoices;
    state.status = "success";
  },
  storename_request(state) {
    state.status = "loading";
  },
  storename_recieved(state) {
    state.status = "success";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
