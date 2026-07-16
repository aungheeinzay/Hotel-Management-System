import errorHandler from "../lib/errorHandler.js";
import { Booking } from "../model/booking.js";
import type {BookingInput, UserType} from "../lib/type.js";
import {NotFoundError} from "../lib/notFound.js";
import ApiFilters from "../lib/apiFilters.js";
import {pubsub} from "../apollo/pubsub.js";

export const createBooking = errorHandler(async (bookingInfo: BookingInput, userId: string) => {
    const newBooking = await Booking.create({
        ...bookingInfo,
        user: userId
    });
    pubsub.publish("NEW_BOOKING",{
        newBookingNoti:"new booking placed"
    })
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
    if (user._id.toString()!==booking.user.toString()){
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
    const needToPay = bookings.reduce((sum,booking)=>{
        if (booking?.paymentInfo?.status=="pending"){
            sum+=booking.amount.total
        }
        return sum
    },0)
    return {
        bookings,
        meta:{
            unPaidBooking,
            needToPay,
            totalBooking
        }
    }
})

export const getBookingForInvoice =errorHandler(async (bookingId:string)=>{
    const booking = await Booking.findById(bookingId).populate("room")
    if (!booking){
        throw new NotFoundError(`Booking not found`)
    }
    return booking
})

export const getDashBoardMetaData = errorHandler(async (startDate: string | number, endDate: string | number) => {

    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    // 2. MongoDB Aggregation
    const saleDataInfo = await Booking.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: start,
                    $lte: end
                }
            }
        },
        {
            $facet: {
                salesData: [
                    {
                        $group: {
                            _id: {
                                date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                            },
                            totalSales: { $sum: "$amount.total" },
                            numberOfBooking: { $sum: 1 }
                        }
                    }
                ],
                pendingCashData: [
                    { $match: { "paymentInfo.status": "pending" } },
                    {
                        $group: {
                            _id: null,
                            totalPendingCash: { $sum: "$amount.total" }
                        }
                    }
                ],
                paidCashData: [
                    {
                        $match: {
                            "paymentInfo.status": "paid"
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalPaidCash: { $sum: "$amount.total" } // tatal မှ total သို့ ပြင်ဆင်ထားသည်
                        }
                    }
                ]
            }
        }
    ]);

    // 3. Destructuring Data
    const {
        salesData: salesDataResult = [],
        pendingCashData: pendingCashDataResult = [],
        paidCashData: paidCashDataResult = []
    } = saleDataInfo[0] || {};

    let totalSales = 0;
    let totalBooking = 0;
    const saleMap = new Map();

    // 4.
    salesDataResult.forEach((data: any) => {
        const date = data?._id?.date;
        const sales = data?.totalSales || 0;
        const booking = data?.numberOfBooking || 0;

        saleMap.set(date, { sales, booking });
        totalSales += sales;
        totalBooking += booking;
    });

    // 5 0 ဖြင့် ဖြည့်စွက်ပေးခြင်း
    const finalSaleDate = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
        const dateStr = currentDate.toISOString().split("T")[0];
        finalSaleDate.push({
            date: dateStr,
            sales: saleMap.get(dateStr)?.sales || 0,
            booking: saleMap.get(dateStr)?.booking || 0
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    const totalPendingAmount = pendingCashDataResult[0]?.totalPendingCash || 0;
    const totalPaidCash = paidCashDataResult[0]?.totalPaidCash || 0;


    return {
        saleData: finalSaleDate,
        totalSales,
        totalBooking,
        totalPendingSale: totalPendingAmount,
        totalPaidCash: totalPaidCash
    };
})
export const getAllBookings = errorHandler(async (user:UserType,page:number,perPage:number)=>{
    const isAdmin = user.role?.includes("admin")
    if (!isAdmin)throw new Error("UnAuthorized to see these")
    console.log("page",page,perPage)
    const api = new ApiFilters(Booking).pagination(page,perPage)
    const totalBookings = await api.count()
    const bookings = await api.model.populate("room")
    return {
        bookings,
        totalBookings
    }
})