import {request} from './request'

export function getHomeBanner(){
    return request({
        url:'/vuedemo/banner'
    })
}

export function getFeature(){
    return request({
        url:'/vuedemo/feature'
    })
}