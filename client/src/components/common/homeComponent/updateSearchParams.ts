export default (searchParam:URLSearchParams,key:string,value:string)=>{
    if (searchParam.has(key)){
        searchParam.set(key,value)
    }else {
        searchParam.append(key,value)
    }
    return searchParam
}