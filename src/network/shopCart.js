import { requestPost } from './request'
export function getShopCart(data = "") {
    return requestPost({
        url: '/vuedemo/get_shopcart',
        data:{
            user_id:data
        }
    })
}
