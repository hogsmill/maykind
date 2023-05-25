
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    connections: 0,
    connectionError: null,
    localStorageStatus: true,
    session: '',
    tab: 'main',
    admin: false,
    siteAdmin: false,
    modals: {
      contact: false,
      'buying-or-renting': false,
      selling: false,
      letting: false
    },
    emails: [
      'info@hogsmill.com',
      'steve@hogsmill.com',
      'info@maykind.co.uk'
    ]
  },
  getters: {
    getConnections: (state) => {
      return state.connections
    },
    getConnectionError: (state) => {
      return state.connectionError
    },
    getLocalStorageStatus: (state) => {
      return state.localStorageStatus
    },
    getSession: (state) => {
      return state.session
    },
    getTab: (state) => {
      return state.tab
    },
    getAdmin: (state) => {
      return state.admin
    },
    getSiteAdmin: (state) => {
      return state.siteAdmin
    },
    getModals: (state) => {
      return state.modals
    },
    getEmails: (state) => {
      return state.emails
    }
  },
  mutations: {
    updateConnections: (state, payload) => {
      state.connections = payload
    },
    updateConnectionError: (state, payload) => {
      state.connectionError = payload
    },
    localStorageStatus: (state, payload) => {
      state.localStorageStatus = payload
    },
    updateSession: (state, payload) => {
      state.session = payload
    },
    updateLogin: (state, payload) => {
      state.session = payload.session
      state.userName = payload.userName
      state.admin = payload.admin
      state.siteAdmin = payload.siteAdmin
    },
    updateTab: (state, payload) => {
      state.tab = payload
    },
    updateAdmin: (state, payload) => {
      state.admin = payload
    },
    updateSiteAdmin: (state, payload) => {
      state.siteAdmin = payload
    },
    showModal: (state, payload) => {
      const modals = Object.keys(state.modals)
      for (let i = 0; i < modals.length; i++) {
        state.modals[modals[i]] = false
      }
      state.modals[payload] = true
      console.log(state.modals)
    },
    hideModal: (state, payload) => {
      state.modals[payload] = false
      console.log(state.modals)
    },
  },
  actions: {
    updateConnections: ({ commit }, payload) => {
      commit('updateConnections', payload)
    },
    updateConnectionError: ({ commit }, payload) => {
      commit('updateConnectionError', payload)
    },
    localStorageStatus: ({ commit }, payload) => {
      commit('localStorageStatus', payload)
    },
    updateSession: ({ commit }, payload) => {
      commit('updateSession', payload)
    },
    updateTab: ({ commit }, payload) => {
      commit('updateTab', payload)
    },
    updateAdmin: ({ commit }, payload) => {
      commit('updateAdmin', payload)
    },
    updateSiteAdmin: ({ commit }, payload) => {
      commit('updateSiteAdmin', payload)
    },
    showModal: ({ commit }, payload) => {
      commit('showModal', payload)
    },
    hideModal: ({ commit }, payload) => {
      commit('hideModal', payload)
    }
  }
})
