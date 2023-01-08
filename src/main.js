import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net';
import 'datatables.net-select';
import './Firebase'
 
DataTable.use(DataTablesLib);

const appInstance = createApp(App);
// appInstance.use(Firebase);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
