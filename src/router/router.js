import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      meta: {
        hideMenu: true,
        skipAuthentication: true,
      },
      component: () => import("../views/Authentication/Login.vue"),
    },
    {
      path: "/envio",
      name: "Dispatch",
      meta: {},
      component: () => import("../views/UserClient/Dispatch.vue"),
    },
    {
      path: "/pasta_digital",
      name: "Digital Folder",
      meta: {},
      component: () => import("../views/UserClient/DigitalFolder.vue"),
    },
    {
      path: "/processos/",
      name: "Proccess",
      meta: {},
      component: () => import("../views/UserClient/Proccess.vue"),
    },
    {
      path: "/financeiro",
      name: "Financial",
      meta: {},
      component: () => import("../views/UserClient/Financial.vue"),
    },
    {
      path: "/suporte",
      name: "Support",
      meta: {},
      component: () => import("../views/UserClient/Support.vue"),
    },
  ],
});

// Global before guard to redirect user to the login page when authentication is needed
router.beforeResolve((to, _from, next) => {
  if (to.meta && to.meta.skipAuthentication) {
    next();
  } else if (store.getters["authentication/isJwtExpired"]) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
