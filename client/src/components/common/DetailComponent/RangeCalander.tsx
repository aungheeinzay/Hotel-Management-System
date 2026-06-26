"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { type DateRange } from "react-day-picker"

import {Calendar, CalendarDayButton} from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RiCalendarEventLine} from "@remixicon/react";
import {useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import formatDate from "@/lib/formatDate.ts";
interface Props extends React.HtmlHTMLAttributes<HTMLDivElement>{
    dates?:DateRange
    disabledDates?:string[]
    onDateChange:(date:DateRange | undefined)=>void
}
export function RangeCalender({dates,disabledDates,onDateChange}:Props) {
    const [searchParams] = useSearchParams()
    const startDate = searchParams.get("startDate")
    const endDate =searchParams.get("endDate")

    const isControl = dates!==undefined
    const [internalDates,setInternalDates]=useState<DateRange | undefined>(()=>{
        if (dates)return dates
        if (startDate || endDate){
            return {
                from:startDate ? new Date(startDate) : undefined,
                to:endDate ? new Date(endDate) :undefined
            }
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
    onDateChange(newDate)
}

    return (
        <Popover>
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
                        />
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>



    )
}
