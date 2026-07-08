export default (value:number | string | undefined)=>{
    if (typeof value =="number"){
        return new Intl.NumberFormat('en-US').format(value)
    }
    return value
}