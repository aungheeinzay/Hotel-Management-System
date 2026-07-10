import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import IsAuthenticated from "@/components/common/IsAuthenticated.tsx";
import {useLazyQuery} from "@apollo/client/react";
import {GET_ALL_BOOKING} from "@/graphql/queries/booking.ts";
import type {AllBooking} from "@/lib/type.ts";
import NotFound from "@/components/common/NotFound.tsx";
import IsLoading from "@/components/common/Loading.tsx";
import {DataTable} from "@/components/common/Data_Table.tsx";
import {columns} from "@/components/admin/bookings/columns.tsx";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router";


function Page(){
    const [page,setPage]=useState(1)
    const [perPage]= useState(5)
    const [_,setSearchParam] = useSearchParams()
    const [getAllBookings,{data,error,loading}] = useLazyQuery<{
        getAllBookings:{
            bookings:AllBooking[]
            totalBookings:number
        }
    }>(GET_ALL_BOOKING)
    async function fetchBooking(){
        await getAllBookings({
            variables:{
                page,
                perPage
            }
        })
    }
    useEffect(() => {
    fetchBooking()
        setSearchParam({
            page:page.toString(),
            perPage:perPage.toString()
        })
    }, [page,perPage]);
    const response = data?.getAllBookings?.bookings.map((booking)=>{
        return {
            id:booking.id,
            roomId:booking.room.id,
            roomNumber:booking.room.roomNumber,
            startDate:booking.startDate,
            endDate:booking.endDate,
            email:booking.customer.email,
            status:booking.paymentInfo.status,
            method:booking.paymentInfo.method
        }
    })
    const numberOfPages= Math.ceil(data?.getAllBookings?.totalBookings! /page) || 1
    const hasNext = numberOfPages> page
    if (error){
        return <NotFound/>
    }
    console.log("response",response )
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bookings Table</CardTitle>
                <CardDescription>You can control and check of all bookings</CardDescription>
            </CardHeader>
            <CardContent>
                <IsLoading isLoading={loading}>
                    <DataTable
                        columns={columns}
                        data={response || []}
                        page={page}
                        hasNext={hasNext}
                        onChange={setPage}
                    />
                </IsLoading>
            </CardContent>
        </Card>
    )
}

export default IsAuthenticated(Page,"admin")