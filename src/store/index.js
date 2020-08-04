import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"
Vue.use(Vuex)

const state = {
  urlPath: 'http://106.12.85.17:8090/public/image',
  TabBar: {
    is_jd_TabBar: true,
    is_jx_TabBar: false,
  },
  userInfo: 1,
  keepExclude: 'Details,Cart',
  keepInclude: '',
  shopCart: {
    jd: [1, 2, 3, 4],
    shop1: [1, 2, 34],
    shop2: [1, 2, 3, 4],
    shop3: [12, 3, 123]
  },
  loginRecords:'',//进入login的记录
  temp:null,
}
const x = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {}
})
export default x
