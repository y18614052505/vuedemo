import {request} from './request'
export function getHomeBanner(){
    return request({
        url:'/vuedemo/banner'
    })
}

//导出一个获取功能视图的 访问
export function getFeature(){
    return request({
        url:"/vuedemo/feature",
        params:{
            show:1
        }
    })
}
//导出1级分类

export function get_jd_category_one(){
    return request({
         url:"/vuedemo/get_jd_category_one",
    })
}
//导出2级分类
export function get_jd_category_two(){
    return request({
        url:"/vuedemo/get_jd_category_two",
    })
}

//导出3级分类
export function get_jd_category_three(){
    return request({
        url:"/vuedemo/get_jd_category_three",
    })
}
