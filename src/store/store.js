
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    connections: 0,
    connectionError: null,
    localStorageStatus: true,
    mobile: false,
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
    properties: [],
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
    getMobile: (state) => {
      return state.mobile
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
    getModal: (state) => {
      let isModal = false
      const keys = Object.keys(state.modals)
      for (let i = 0; i < keys.length; i++) {
        console.log(keys[i], state.modals[keys[i]])
        if (state.modals[keys[i]]) {
          isModal = true
        }
      }
      return isModal
    },
    getModals: (state) => {
      return state.modals
    },
    getProperties: (state) => {
      return state.properties
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
    updateMobile: (state, payload) => {
      console.log(payload)
      state.mobile = payload
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
    },
    hideModal: (state, payload) => {
      state.modals[payload] = false
    },
    updateProperties: (state, payload) => {
      state.properties = payload
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
    updateMobile: ({ commit }, payload) => {
      commit('updateMobile', payload)
    },
    updateSiteAdmin: ({ commit }, payload) => {
      commit('updateSiteAdmin', payload)
    },
    showModal: ({ commit }, payload) => {
      commit('showModal', payload)
    },
    hideModal: ({ commit }, payload) => {
      commit('hideModal', payload)
    },
    updateProperties: ({ commit }, payload) => {
      commit('updateProperties', payload)
    },
  }
})
