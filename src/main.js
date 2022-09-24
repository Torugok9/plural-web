import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import store from "./store";
import router from "./router/router";
import vuetify from "./plugins/vuetify";
import VueMask from 'v-mask'

Vue.config.productionTip = false;

Vue.use(VueMask);

store.dispatch("authentication/validateSession");

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
