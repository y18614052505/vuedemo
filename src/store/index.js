import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urlPath: 'http://106.12.85.17:8090/public/image',
    TabBar: {
      is_jd_TabBar: true,
      is_jx_TabBar: false,
    },
    userId: null,
    keepExclude: 'Details,Cart',
    keepInclude: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
