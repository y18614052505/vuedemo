import Vue from "vue"
import router from '../router'
// 解构赋值一个常量
// import {POST_SHOPCART} from "./mutation-types"
// 获取shopcart网络请求
import {postShopCart} from 'network/shopCart'
//取所有的常量
import * as types from "./mutation-types"
export default {
  [types.BACK]() {
    router.go(-1)
  },
  //要做的是网络请求---->需要在actions中做分发监控,不然同步数据不会被改变
  //所以要把当前的事件，在actions中进行执行
  [types.POST_SHOPCART](state,payload){
    state.totalPayment = 0;
    state.totalNum = 0;
    postShopCart(payload).then(res=>{
      state.shopCart = {};
      // console.log(res);
      if(res.code != 200) return console.log('请求数据失败');
      state.shopCartLength = res.data.length;
      //循环，把同一个店铺的东西分组取出来。
      res.data.forEach(item=>{//循环的是所有数据
        if (state.shopCart[item.shop_name]) {
          state.shopCart[item.shop_name].push(item)     
        }else{
          state.shopCart[item.shop_name] = [item]
        }
        //得到选中的商品的总价
        if(item.ischeck == '1'){
          state.totalPayment += item.money_now * item.num
          state.totalNum += item.num
        }
        //获取所有商品的总价
        state.ShopCartMoneyAll += item.money_now * item.num
        state.ShopCartGoodsNum += item.num * 1
      })
      // console.log(state.shopCart);        
    })
  },
  [types.UPDATE_SHOPCART](state,payload){
    console.log("被执行");
    Vue.set(state.shopCart,payload.shop,payload.val)
  }
}
