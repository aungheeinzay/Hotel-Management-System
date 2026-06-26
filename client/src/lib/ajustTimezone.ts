export default (time:Date | string)=>{
    if (!time)return
    const newTime =new Date(time).getTime()
    const now =new Date()
    const correctDate =new Date((newTime - now.getTimezoneOffset()*60*100))
    return correctDate.toISOString().split('T')[0]
}