import {createBooking, getBookingById} from "../../controller/Booking";
import type {BookingInput} from "../../lib/type";

export const bookingResolvers={
    Mutation:{
        createBooking:async(_:any,{bookingInfo}:{bookingInfo:BookingInput},{userId}:{userId:string})=>await createBooking(bookingInfo,userId)
    },
    Query:{
        getBookingById:async(_:any,{bookingId}:{bookingId:string},{userId}:{userId:string})=>await getBookingById(bookingId,userId)
    }
}