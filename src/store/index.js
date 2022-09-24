import Vue from "vue";
import Vuex from "vuex";
import authentication from './modules/authentication'
import vuexLogger from '../plugins/vuexLogger'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  strict: debug,
  plugins: debug ? [vuexLogger()] : []
});
