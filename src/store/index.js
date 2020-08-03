import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urlPath: 'http://106.12.85.17:8090/public/image',
    TabBar: {
      is_jd_TabBar: true,
      is_jx_TabBar: false,
    },
    userInfo: null,
    keepExclude: 'Details,Cart',
    keepInclude: '',
    shopCar:{
      //京东自营商品
      jd:[],
      //其他店铺商品
      shop1:[],
      shop2:[],
      shop3:[]
    }
  },
  mutations: {
    back() {
      router.go(-1)
    }
  },
  getters:{
    shopCarLength(state){
      let temp = 0;
      for (const iterator of state.shopCar) {
        console.log(iterator)
        temp += iterator.length;
        console.log(temp);
      }
      return temp
    }
  },
  actions: {
  },
  modules: {
  }
})
