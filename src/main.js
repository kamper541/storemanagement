import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import "datatables.net-select";
import axios from "axios";

DataTable.use(DataTablesLib);

const appInstance = createApp(App);

// appInstance.provide('$http', axios)
appInstance.config.globalProperties.$http = axios;
const token = localStorage.getItem("token")

if (token) {
    appInstance.config.globalProperties.$http.defaults.headers.common['Authorization'] = token;
}
// appInstance.provide('$axios', axios)
// appInstance.use(Firebase);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
