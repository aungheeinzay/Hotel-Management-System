export default (time:Date | string)=>{
    if (!time)return

    const locDate =new Date(time)
    locDate.setMinutes(locDate.getMinutes()-locDate.getTimezoneOffset())
    return locDate
}
