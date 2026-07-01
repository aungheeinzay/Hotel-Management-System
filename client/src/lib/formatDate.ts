import {format} from "date-fns";

export default (date:Date | string,style:string)=>{
    if (!(date instanceof Date)){
        date = new Date(parseInt(date))
    }
    return format(date,style)
}