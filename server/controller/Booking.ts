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

export const getBookedDays = errorHandler(async (roomId:string)=>{
    const books =await Booking.find({room:roomId})
    if (!books)return null
    return  books.flatMap((book)=>{
        const dates=[]
        const startDate = new Date(book.startDate)
        const endDate = new Date(book.endDate)
        for (let date = new Date(startDate);
                date <= endDate;
                date.setDate(date.getDate()+1)){
            dates.push(new Date(date))
        }
        return [...dates]
    })
})

export const getBookingByUserId=errorHandler(async (userId:string)=>{
    const bookings =await Booking.find({user:userId}).populate("room").sort({createdAt:-1})
    if (!bookings || bookings.length==0)return
    const  totalBooking = bookings.length
    const unPaidBooking = bookings.filter(booking=>booking?.paymentInfo?.status!=="paid").length
    const needToPay = bookings.reduce((sum,booking)=>sum+=booking.amount.total,0)
    return {
        bookings,
        meta:{
            unPaidBooking,
            needToPay,
            totalBooking
        }
    }
})