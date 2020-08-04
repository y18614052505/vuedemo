import { requestPost } from './request'
export function postShopCart(data = "") {
    return requestPost({
        url: '/vuedemo/get_shopcart',
        data:{//post 请求数据的时候，提交数据用data
            user_id:data
        }
    })
}