import IsAuthenticated from "@/components/common/IsAuthenticated.tsx";
import MyBooking from "@/components/MyBookings/MyBooking.tsx";
import {useQuery} from "@apollo/client/react";
import {GET_MY_BOOKING} from "@/graphql/queries/booking.ts";
import type {MyBookingType} from "@/lib/type.ts";
import IsLoading from "@/components/common/Loading.tsx";


function Page(){
    const {data,error,loading}= useQuery<{getBookingByUserId:MyBookingType}>(GET_MY_BOOKING)
    if (error){
        <p>something went wrong</p>
    }
    return(
        <main className={"layout"}>
           <IsLoading isLoading={loading}>
               {
                   data?.getBookingByUserId &&
                   <MyBooking
                       bookings={data.getBookingByUserId.bookings}
                       meta={data.getBookingByUserId.meta}
                   />
               }
           </IsLoading>
        </main>
    )
}

const MyBookingPage =IsAuthenticated(Page)
export default MyBookingPage;