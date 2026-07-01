import type {MyBookingType} from "@/lib/type.ts";

import {RiErrorWarningLine, RiHandCoinLine, RiWalletLine} from "@remixicon/react";
import MetaInfoCard from "@/components/MyBookings/metaInfoCard.tsx";
import {type BookingRow, columns} from "@/components/MyBookings/columns.tsx";
import {DataTable} from "@/components/MyBookings/Data_Table.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useReactiveVar} from "@apollo/client/react";
import {userInfoVar} from "@/apolllo/apolloVar.ts";


export default function MyBooking({bookings,meta}:MyBookingType){
    const user =useReactiveVar(userInfoVar)
    const data:BookingRow[]=bookings?.map((book)=>{
        return {
            id:book.id,
            roomId:book.room.id,
            title:book.room.title,
            status:book.paymentInfo.status,
            method:book.paymentInfo.method,
            total:book.amount.total,
            startDate:book.startDate,
            endDate:book.endDate

        }
    })

    const metaInfoList=[
        {
            label:"Total Bookings",
            value:meta.totalBooking,
            icon:<RiWalletLine size={16} />
        },
        {
            label:"Unpaid Bookings",
            value:meta.unPaidBooking,
            icon:<RiErrorWarningLine size={16} />
        },
        {
            label:"Need to Pay",
            value:meta.needToPay,
            icon:<RiHandCoinLine size={16} />
        }
    ]
    return (
        <div className={"w-full flex flex-col justify-center items-center gap-10"}>
            <section className={"w-full grid grid-cols-3 gap-4"}>
                {
                    metaInfoList.map(({label,value,icon})=>
                        <MetaInfoCard label={label} value={value} icon={icon}/>)
                }
            </section>
            <section className={"w-full"}>
           <Card>
             <CardHeader>
                 <CardTitle>{user?.username}'s bookings</CardTitle>
                 <CardDescription>
                     view your bookings and manage
                 </CardDescription>
             </CardHeader>
               <CardContent>
                   <DataTable columns={columns} data={data}/>
               </CardContent>
           </Card>
            </section>
        </div>
    )
}