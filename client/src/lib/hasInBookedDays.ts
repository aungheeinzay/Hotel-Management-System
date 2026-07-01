import type {DateRange} from "react-day-picker";
import {addDays, isSameDay} from "date-fns";



function isInclide(date:Date,disabledDate:Date[]){
    return disabledDate.some((dDate)=>isSameDay(date,dDate))
}

export default (dateRange:DateRange,disabledDates:Date[])=>{
if (!dateRange.from || !dateRange.to)return false
   let startDate = new Date(dateRange.from)
    const endDate = new Date(dateRange.to)
    while (startDate <=endDate){
    if (isInclide(startDate,disabledDates)){
        return true
    }
    startDate=addDays(startDate,1)
    }
return false
}