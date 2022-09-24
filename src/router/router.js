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
      component: () => import("../views/Authentication/Login"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      meta: {},
      component: () => import("../views/Dashboard/Dashboard"),
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
