import kode from './kode'

import user from './modules/user'
import notification from './modules/notification'
import processing from './modules/processing'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    kode,
    user,
    notification,
    processing
  }
})
