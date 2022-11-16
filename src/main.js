import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import store from "./store";
import router from "./router/router";
import vuetify from "./plugins/vuetify";
import VueMask from "v-mask";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
Vue.use(VueMask);

store.dispatch("authentication/validateSession");

if (store.getters["authentication/hasPermission"]("client", "master")) {
  setInterval(async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser.id) return;

    if (store.getters["authentication/hasPermission"]("client", "master")) {
      // ...
    }
  }, 60000);
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
