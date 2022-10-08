/* eslint-disable */
import { axios } from '../../plugins/axios'
import jwtDecode from 'jwt-decode'

// initial state
// shape: [{ id, quantity }]
const state = () => ({
  currentUser: JSON.parse(localStorage.currentUser || '{}')
})

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
      if (!roles.length) return true;
      const userRole = state.currentUser.role.default_to;

      return roles.some((role) => role === userRole);
    },
};

// actions
const actions = {
  validateSession: async ({ dispatch, state, getters, commit }) => {
    if (!(state.currentUser && state.currentUser.token)) {
      return
    }
    if (getters.isJwtExpired) {
      dispatch('logout')
    } else {
      try {
        await dispatch('login', {})
      } catch (error) {
        console.log('Session expired', error)
        commit('setCurrentUser', { user: {} })
      }
    }
  },
  login: async ({ commit }, user) => {
    try {
      const response = await axios.post('/login', { user: user }, )

      commit('setCurrentUser', { user: response.data })
    } catch (error) {

    }
  },
  logout: async ({ commit }) => {
    try {
      try {
        await axios.delete('/logout')
      } catch (error) {}

      commit('setCurrentUser', { user: {} })
    } catch (error) {}
  }
}

// mutations
const mutations = {
  setCurrentUser (state, { user }) {
    state.currentUser = user || {}
    localStorage.currentUser = JSON.stringify(state.currentUser)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
