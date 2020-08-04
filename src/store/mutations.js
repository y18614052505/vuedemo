// import Vue from "vue"
import router from '../router'

// 解构赋值一个常量
import {GET_SHOPCART} from "./mutation-types"
// 获取shopcart网络请求
import {getShopCart} from 'network/shopCart'
//取所有的常量
import * as types from "./mutation-types"
export default {
  [types.BACK]() {
    router.go(-1)
  },
  [GET_SHOPCART](state,payload){
    getShopCart(payload).then(res=>{
      state.temp = res
      console.log(state.temp);
    })
  },
}
