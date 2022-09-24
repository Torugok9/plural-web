/* eslint-disable */
"use strict";

import Vue from "vue";
import axios from "axios";
import store from "../store";
import router from "../router/router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const API_URL =
  process.env.VUE_APP_BASE_URL ||
  process.env.VUE_APP_BACK_SERVER ||
  "http://localhost:3000";

const addAuthorizationToken = (data, headers) => {
  const currentUser = store.state.authentication.currentUser;

  if (currentUser && currentUser.token) {
    headers.Authorization = `Bearer ${currentUser.token}`;
  }

  if (data instanceof FormData) return data;

  return JSON.stringify(data);
};

const config = {
  baseURL: `${API_URL}/api/v1`,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: addAuthorizationToken,
};

const _axios = axios.create(config);

// _axios.interceptors.request.use(
//   // function (config) {
//   //   console.log("router", router);
//   // },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    console.warn("Api request error\n", error);
    switch (error.response.status) {
      case 401:
        store.dispatch("authentication/logout");
        router.replace({
          path: "/",
          query: { redirect: router.currentRoute.fullPath },
        });
        break;
      case 403:
        store.dispatch("authentication/logout");
        router.replace({
          path: "/",
          query: { redirect: router.currentRoute.fullPath },
        });
        break;
    }
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;

export { _axios as axios };
