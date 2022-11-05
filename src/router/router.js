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
      path: "/client/login",
      name: "ClientLogin",
      meta: {
        hideMenu: true,
        skipAuthentication: true,
      },
      component: () => import("../views/Authentication/LoginClient.vue"),
    },
    {
      path: "/master/login",
      name: "MasterLogin",
      meta: {
        hideMenu: true,
        skipAuthentication: true,
      },
      component: () => import("../views/Authentication/LoginMaster.vue"),
    },
    {
      path: "/client/envio",
      name: "Dispatch",
      meta: {
        permissions: ["client"],
      },

      component: () => import("../views/UserClient/Dispatch.vue"),
    },
    {
      path: "/client/pasta_digital",
      name: "Digital Folder",
      meta: {
        permissions: ["client"],
      },

      component: () => import("../views/UserClient/DigitalFolder.vue"),
    },
    {
      path: "/client/processos/",
      name: "Proccess",
      meta: {
        permissions: ["client"],
      },

      component: () => import("../views/UserClient/Proccess.vue"),
    },
    {
      path: "/client/financeiro",
      name: "Financial",
      meta: {
        permissions: ["client"],
      },

      component: () => import("../views/UserClient/Financial.vue"),
    },
    {
      path: "/client/suporte",
      name: "Support",
      meta: {
        permissions: ["client"],
      },

      component: () => import("../views/UserClient/Support.vue"),
    },
    {
      path: "/master/painel",
      name: "Panel",
      meta: {
        hideMenu: true,
        menuMaster: true,
        permissions: ["master"],
      },

      component: () => import("../views/Master/Panel.vue"),
    },
    {
      path: "/master/cadastro",
      name: "Register",
      meta: {
        hideMenu: true,
        menuMaster: true,
        permissions: ["master"],
      },

      component: () => import("../views/Master/Register.vue"),
    },
    {
      path: "/master/perfil-cliente/:id",
      name: "ClientPerfil",
      meta: {
        hideMenu: true, 
        menuMaster: true,
        permissions: ["master"],
      },

      component: () => import("../views/Perfil/Client.vue"),
    },
  ],
});

router.beforeResolve((to, _from, next) => {
  if (to.meta && to.meta.skipAuthentication) {
    next();
  } else if (store.getters["authentication/isJwtExpired"]) {
    next({ name: "Login" });
  } else if (to.meta && to.meta.permissions) {
    if (store.getters["authentication/hasPermission"](...to.meta.permissions)) {
      next();
    } else {
      const roles = {
        client: "clientes",
        master: "administradores",
      };
      console.log(localStorage)
      localStorage.setItem("currentUser", "{}");
      Vue.swal({
        color: "#ffffff",
        background: "#34103B",
        position: "bottom",
        title: "Plural",
        icon: "error",
        toast: true,
        timer: 4500,
        timerProgressBar: true,
        showConfirmButton: false,
        text: `Apenas ${roles[to.meta.permissions] || ""} são permitidos`,
      });
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
