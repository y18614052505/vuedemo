export function debounce(func,delay){
    let timer = null 
    return function (...argu){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{    
            console.log(timer);
            func.apply(this,argu)
        },delay)
    }
}