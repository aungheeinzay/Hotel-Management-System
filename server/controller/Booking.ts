import errorHandler from "../lib/errorHandler";
import { Booking } from "../model/booking";
import type { BookingInput } from "../lib/type";
import {NotFoundError} from "../lib/notFound";

export const createBooking = errorHandler(async (bookingInfo: BookingInput, userId: string) => {
    const newBooking = await Booking.create({
        ...bookingInfo,
        user: userId
    });

    return newBooking.id;
});


export const getBookingById = errorHandler(async (bookingId:string,userId:string)=>{
    const booking = await Booking.findById(bookingId)
    if (!booking){
        throw new NotFoundError(`Booking id not found`)
    }
    if (booking.user.toString() !== userId)throw new Error("unAuthorizes to see")
    return booking
})