import errorHandler from "../lib/errorHandler";
import { Booking } from "../model/booking";
import type {BookingInput, UserType} from "../lib/type";
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
    if (booking.user.toString() !== userId)throw new Error("unAuthorizes to book")
    return booking
})

export const updateBookingPayment=errorHandler(async (bookingId:string,bookingInput:Partial<BookingInput>,user:UserType)=>{
    console.log("booking input",bookingInput)
    const booking = await Booking.findById(bookingId)
    if(!booking){
        throw new NotFoundError('Booking not found')
    }
    if (!user.role?.includes("admin") || user._id.toString()!==booking.user.toString()){
        throw new Error("unAuthorized to update booking payment")

    }
    await booking.set(bookingInput).save()
    return true
})