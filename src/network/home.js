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
