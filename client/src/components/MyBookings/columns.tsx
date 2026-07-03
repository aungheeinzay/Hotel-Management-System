
import { Button } from "@/components/ui/button"

import { type ColumnDef } from "@tanstack/react-table"
import formatDate from "@/lib/formatDate.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {Link} from "react-router";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BookingRow = {
    id: string
    roomId:string
    title:string
    status: "pending" | "paid"
    method:"cash" | "card" | null
    total:number
    startDate:string
    endDate:string
}

export const columns: ColumnDef<BookingRow>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell:({row})=>{
            const title =row.original.title;
            const roomId = row.original.roomId
            return <Link to={"/"+roomId}>
                {title}
            </Link>
        }
    },
    {
        accessorKey:"startDate",
        header:"Check In",
        cell:({row})=>{
            return (
                <p className={"text-sm text-muted-foreground"}>{formatDate(row.original.startDate,"P")}</p>
            )
        }
    },
    {
        accessorKey:"endDate",
        header:"Check Out",
        cell:({row})=>{
            return (
                <p className={"text-sm text-muted-foreground"}>{formatDate(row.original.endDate,"P")}</p>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell:({row})=>{
            const status =row.original.status
            return <Badge variant={status=="paid"? "secondary" : "destructive"}>
                {status}
            </Badge>
        }
    },

    {
        accessorKey:"method",
        header:"Method"
    },
    {
        accessorKey:"total",
        header:"Total",
        cell:({row})=>{
            return (
                <p><strong>$ {row.original.total}</strong></p>
            )
        }
    },
    {   header:"Action",
        id: "actions",
        cell: ({ row }) => {
           const status = row.original.status
            const id =row.original.id
            const to = status=="paid" ? "/bookingInvoice/"+id :"/bookings/"+id+"/payment"
            const label = status=="paid"? "get invoice" : "pay now";
           return <Button asChild>
               <Link to={to}>
                   {label}
               </Link>
           </Button>
        },
    },

]