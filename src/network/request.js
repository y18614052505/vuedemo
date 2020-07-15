import axios from 'axios'

export function request(config){
    const instance = new axios.create({
        baseURL:"http://106.12.85.17:8090"
    })
    //请求拦截
    instance.interceptors.request.use(config=>{
        //.....
        // console.log(config);
        return config
    })

    //响应拦截
    instance.interceptors.response.use(res=>{
        //....
        // console.log(res);
        return res.data
    },err=>{
        console.log(err);
    })
    return instance(config)
}