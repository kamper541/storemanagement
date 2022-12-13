import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
// import Vue3EasyDataTable from 'vue3-easy-data-table'
// import 'vue3-easy-data-table/dist/style.css'

const appInstance = createApp(App);
appInstance.use(store);
// appInstance.component('EasyDataTable', Vue3EasyDataTable)
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
