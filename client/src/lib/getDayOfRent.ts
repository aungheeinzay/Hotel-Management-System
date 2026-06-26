import type {DateRange} from "react-day-picker";
import {differenceInDays} from "date-fns";

export default (range:DateRange | undefined)=>{
if (!range?.from || !range.to)return 0;
const from = new Date(range.from)
const to = new Date(range.to)
from.setHours(0, 0, 0, 0)
to.setHours(0,0,0,0)
    return differenceInDays(to,from)
}