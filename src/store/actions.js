// 解构赋值一个常量
import * as types from "./mutation-types"
export default {
    getShopCart(context,payload){
        context.commit(types.GET_SHOPCART,payload)
    }
}