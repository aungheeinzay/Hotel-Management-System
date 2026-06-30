import {createBooking, getBookingById, updateBookingPayment} from "../../controller/Booking";
import type {BookingInput, UserType} from "../../lib/type";

export const bookingResolvers={
    Mutation:{
        createBooking:async(_:any,{bookingInfo}:{bookingInfo:BookingInput},{userId}:{userId:string})=>await createBooking(bookingInfo,userId),
        updateBooking:async(_:any,{bookingId,bookingInput}:{bookingId:string,bookingInput:Partial<BookingInput>},{user}:{user:UserType})=>await updateBookingPayment(bookingId,bookingInput,user)
    },
    Query:{
        getBookingById:async(_:any,{bookingId}:{bookingId:string},{userId}:{userId:string})=>await getBookingById(bookingId,userId),

    }
}