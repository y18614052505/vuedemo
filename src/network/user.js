//不论登录 还是注册，都是跟用户有关系的。。
import {requestPost} from './request';

// params  get请求使用params  或者 query 
// post 请求使用 data 上传数据 

export function register(data){
    // console.log(data);
    return requestPost({
        url:"/vuedemo/register",
        data
    })
}

export function land(data){
    // console.log(data);
    return requestPost({
        url:"/vuedemo/land",
        data
    })
}

export function autoLand(data){
    // console.log(data);
    return requestPost({
        url:"/vuedemo/autoland",
        data
    })
}