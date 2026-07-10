

import type { ColumnDef } from "@tanstack/react-table"
import formatDate from "@/lib/formatDate.ts";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useNavigate} from "react-router";
import {DialogBooking} from "@/components/admin/bookings/UpdateBookingDialog.tsx";
import {useState} from "react";

export type Booking = {
    id: string
    roomId:string
    roomNumber:string
    startDate:string
    endDate:string
    email:string
    status:string
    method:string
}


export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "roomNumber",
        header: "Room Number",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "startDate",
        header: "Check In",
        cell:({row})=>{
            const date = row.original.startDate
            return (
                <p>{formatDate(date,"P")}</p>
            )
        }
    },
    {
        accessorKey: "endDate",
        header:"Check Out",
        cell:({row})=>{
            const date = row.original.endDate
            return (
                <p>{formatDate(date,"P")}</p>
            )
        }
    },
    {
        accessorKey:"status",
        header:"Status"
    },
    {
        header: "Action",
        id: "actions",
        cell: ({ row }) => {
            const navigate = useNavigate();
            const booking = row.original
            const [open,setOpen] = useState(false)
            const bookingInfo = {
                id:booking.id,
                status:booking.status,
                method:booking.method
            }
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                          ...
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigate(`/bookings/${booking.id}/payment`) }
                        >
                            check booking
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DialogBooking
                            booking={bookingInfo}
                        open={open}
                        setOpen={setOpen}>
                            <DropdownMenuItem onClick={(event)=>{
                                event.preventDefault()
                                event.stopPropagation()
                                setOpen(true)
                            }}>update Booking</DropdownMenuItem>
                        </DialogBooking>
                        {
                            booking.status=="paid" &&
                            <DropdownMenuItem onClick={()=>navigate(`/bookingInvoice/${booking.id}`)}>see invoice</DropdownMenuItem>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]