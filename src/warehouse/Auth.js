// import axios from "axios";
// import router from "../router/index";

import axios from "axios";
import router from "../router/index";

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  stock: [],
  status: "",
  fetchingStatus:"",
  error: null,
};

const getters = {
  isLoggedin: (state) => !!state.token,
  authState: (state) => state.status,
  profileReady: (state) => state.fetchingStatus,
  user: (state) => state.user,
  stock: (state) => state.stock,
  error: (state) => state.user,
};

const actions = {
  async login({ commit }, user) {
    commit("auth_request");
    try {
      let res = await axios.post("http://localhost:9000/api/users/login", user);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        // Store the token into the localstorage
        localStorage.setItem("token", token);
        // Set the axios defaults
        axios.interceptors.request.use((config) => {
          config.headers["Authorization"] = token;
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
    try {
      commit("register_request");
      let res = await axios.post(
        "http://localhost:9000/api/users/register",
        userData
      );
      console.log(res);
      if (res.data.success !== undefined) {
        commit("register_success");
      }
      return res;
    } catch (err) {
      commit("register_error", err);
    }
  },

  // Get Profile
  async getProfile({ commit }) {
    commit("profile_request");
    let res = await axios.get("http://localhost:9000/api/users/profile");
    commit("user_profile", res.data.user);
    return res;
  },

  // Logout the user
  async logout({ commit }) {
    console.log("delete: " + localStorage.getItem("token"));
    await localStorage.removeItem("token");
    commit("logout");
    console.log("logout");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/signin");
    return;
  },

  // Get the stock
  async get_stock({commit}) {
    commit("stock_request");
    let res = await axios.get("http://localhost:9000/api/stocks/get_stock")
    commit("get_stock", res.data.stock)
    return res
  }
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
    state.user = "";
  },
  profile_request(state) {
    state.fetchingStatus = "loading";
  },
  user_profile(state, user) {
    state.user = user;
    state.fetchingStatus = "success";
  },
  stock_request(state){
    state.state = "loading"
  },
  get_stock(state, stock){
    state.stock = stock
    state.fetchingStatus = "success";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
