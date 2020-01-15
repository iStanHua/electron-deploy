import Vue from 'vue'
import Vuex from 'vuex'
import { ipcRenderer } from 'electron'

import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    host: ''
  },
  mutations: {
    SET_HOST(state, payload) {
      state.host = payload
    }
  },
  actions: {
    setHost({ commit }, payload) {
      commit('SET_HOST', payload)
    },
    logout({ commit }) {
      ipcRenderer.send('ipc-login', 'logout')
      commit('SET_HOST', '')
      router.replace('/')
    }
  }
})
