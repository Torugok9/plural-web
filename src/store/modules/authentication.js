/* eslint-disable */
import { axios } from "../../plugins/axios";
import jwtDecode from "jwt-decode";
import Vue from "vue";
// import VueSweetalert2 from "vue-sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";
// Vue.use(VueSweetalert2);

// initial state
// shape: [{ id, quantity }]
const state = () => ({
  currentUser: JSON.parse(localStorage.currentUser || "{}"),
});

// getters
const getters = {
  jwtPayload(state) {
    if (!(state.currentUser && state.currentUser.token)) return {};

    return jwtDecode(state.currentUser.token);
  },
  isJwtExpired(_state, getters) {
    return Date.now() >= (getters.jwtPayload.exp || 0) * 1000;
  },
  hasPermission:
    (state) =>
    (...roles) => {
      if (!(state.currentUser && state.currentUser.role)) return false;
      const userRole = state.currentUser.role;

      return roles.some((role) => role === userRole);
    },
};

// actions
const actions = {
  validateSession: async ({ dispatch, state, getters, commit }) => {
    if (!(state.currentUser && state.currentUser.token)) {
      return;
    }
    if (getters.isJwtExpired) {
      dispatch("logout");
    } else {
      try {
        await dispatch("login", {});
      } catch (error) {
        console.log("Session expired", error);
        commit("setCurrentUser", { user: {} });
      }
    }
  },
  login: async ({ commit }, user) => {
    try {
      const response = await axios.post("/login", { user: user });

      commit("setCurrentUser", { user: response.data });
      if (
        window.location.pathname.split("/").includes("client") &&
        getters.hasPermission("client")
      ) {
        Vue.swal({
          color: "#ffffff",
          background: "#34103B",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 4000,
          icon: "success",
          title: "Plural",
          text: "Login realizado com sucesso",
        });
      } else if (
        window.location.pathname.split("/").includes("master") &&
        getters.hasPermission("master")
      ) {
        Vue.swal({
          color: "#ffffff",
          background: "#34103B",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 4000,
          icon: "success",
          title: "Plural",
          text: "Login realizado com sucesso",
        });
      } else
        throw new Error("Apenas contas autorizadas podem acessar esta página");
      dispatch("logout");
    } catch (error) {
      if (error.message.includes("401")) {
        Vue.swal({
          color: "#ffffff",
          background: "#34103B",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 4000,
          icon: "error",
          title: "Plural",
          text: "Email ou Senha inválidos.",
        });
      }
    }
  },
  logout: async ({ commit }) => {
    try {
      try {
        await axios.delete("/logout");
      } catch (error) {}

      commit("setCurrentUser", { user: {} });
    } catch (error) {}
  },
};

// mutations
const mutations = {
  setCurrentUser(state, { user }) {
    state.currentUser = user || {};
    localStorage.currentUser = JSON.stringify(state.currentUser);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
