"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"

import {Calendar,} from "@/components/ui/calendar.tsx"
import { Card, CardContent } from "@/components/ui/card.tsx"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RiCalendarEventLine} from "@remixicon/react";
import {useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import formatDate from "@/lib/formatDate.ts";
import hasInBookedDays from "@/lib/hasInBookedDays.ts";
import {toast} from "sonner";
interface Props extends React.HtmlHTMLAttributes<HTMLDivElement>{
    dates?:DateRange
    disabledDates?:string[]
    onDateChange:(date:DateRange | undefined)=>void
}
export function RangeCalender({dates,disabledDates,onDateChange}:Props) {
    const [searchParams] = useSearchParams()

    const startDate = searchParams.get("startDate")
    const endDate =searchParams.get("endDate")
    const parseDates = disabledDates?.map(date=>new Date(parseInt(date))) || []
    const isControl = dates!==undefined
    const [internalDates,setInternalDates]=useState<DateRange | undefined>(()=>{
        if (dates)return dates

            return {
                from:startDate ? new Date(startDate) : undefined,
                to:endDate ? new Date(endDate) :undefined
            }

    })

    useEffect(() => {
        if (isControl){
            setInternalDates(dates)
        }
    }, [dates,isControl]);
const currentDate = isControl ? dates : internalDates;
const handleDateChange=(newDate : DateRange | undefined)=>{
    if (!isControl){
        setInternalDates(newDate)
    }
    if (newDate && hasInBookedDays(newDate,parseDates)){
        toast.error("please choose another dates.already booked by others")
        setInternalDates(undefined)
        return
    }
    onDateChange(newDate)
}

    return (
        <Popover >
            <PopoverTrigger asChild>
                <Button variant="outline" className={"flex gap-4 justify-start cursor-pointer"}><RiCalendarEventLine size={16} />{
                    currentDate?.from ? currentDate?.to ?
                        <span>{formatDate(currentDate.from,"PP")} to {formatDate(currentDate.to,"PP")}</span> :
                        <span>{formatDate(currentDate.from,"PP")}</span> : <span>Choose a date</span>
                }</Button>

            </PopoverTrigger>
            
            <PopoverContent>
                <Card className="mx-auto w-fit p-0">
                    <CardContent className="p-0">
                        <Calendar
                            mode="range"
                            defaultMonth={currentDate?.from}
                            selected={currentDate}
                            onSelect={handleDateChange}
                            numberOfMonths={2}
                            disabled={[...parseDates,{before:new Date()}]}
                        />
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>



    )
}
