import {gql} from "graphql-tag";
import mongoose from "mongoose";

export const bookingTypeDefs = gql(`
    type Customer{
        name:String!
        email:String!
    }
    type Amount{
        rent:Float!
        discount:Float!
        tax:Float!
        total:Float!
    }
    type PaymentInfo{
        id:ID
        status:String!
        method:String
    }
    type Booking {
    id:ID!
    user:ID!,
    room:ID!,
    startDate:String!
    endDate:String!
    customer:Customer
    amount:Amount
    dayOfRent:Int!
    rentPerDay:Float!,
  paymentInfo:PaymentInfo
    additionalNote:String
    createdAt:String,
    updatedAt:String
    }
    
    type BookingForAdmin{
        id:ID!
        user:User,
        room:Room,
        startDate:String!
        endDate:String!
        customer:Customer
        amount:Amount
        dayOfRent:Int!
        rentPerDay:Float!,
        paymentInfo:PaymentInfo
        additionalNote:String
        createdAt:String,
        updatedAt:String
    }
    
    type BookingByUser {
        id:ID!
        user:User,
        room:Room!,
        startDate:String!
        endDate:String!
        customer:Customer
        amount:Amount
        dayOfRent:Int!
        rentPerDay:Float!,
        paymentInfo:PaymentInfo
        additionalNote:String
        createdAt:String,
        updatedAt:String
    }
    
    input CustomerInput{
        name:String!
        email:String!
    }
    input AmountInput{
        discount:Float!
        tax:Float!
        total:Float!
        rent:Float!
    }
    input PaymentInfoInput{
        id:ID
        status:String
        method:String
    }
    input BookingInput{
        room:ID!,
        startDate:String!
        endDate:String!
        customer:CustomerInput
        amount:AmountInput
        dayOfRent:Int!
        rentPerDay:Float!,
       
        additionalNote:String
    }
    input UpdateBookingPaymentInput{
        paymentInfo:PaymentInfoInput
    }
    type metaBookingByUser{
        unPaidBooking:Int!
        needToPay:Float!
        totalBooking:Int!
    }
    type responseBookingByUserId{
        bookings:[BookingByUser]
        meta:metaBookingByUser
    }
    type BookingByInvoice{
        id:ID!
        user:ID!,
        room:Room!,
        startDate:String!
        endDate:String!
        customer:Customer
        amount:Amount
        dayOfRent:Int!
        rentPerDay:Float!,
        paymentInfo:PaymentInfo
        additionalNote:String
        createdAt:String,
        updatedAt:String
    }

#    return {
#    saleData: finalSaleDate,
#    totalSales,
#    totalBooking,
#    totalPendingSale: totalPendingAmount,
#    totalPaidCash: totalPaidCash
#    }
    type SaleData{
        date:String!,
        sales:Int!
        booking:Int!
    }
    type DashBoardMetaDataResult{
        saleData:[SaleData]!
        totalSales:Float!
        totalBooking:Int!
        totalPendingSale:Int!
        totalPaidCash:Int!
    }
    
    type GetAllBookings{
        bookings:[BookingForAdmin],
        totalBookings:Int!
    }
extend type  Mutation{
createBooking(bookingInfo:BookingInput):String!
    updateBooking(bookingId:String!,bookingInput:UpdateBookingPaymentInput):Boolean
}
    
extend type Query{
    getBookingById(bookingId:String!):Booking
    getBookedDays(roomId:String!):[String]
    getBookingByUserId:responseBookingByUserId!
    getBookingForInvoice(bookingId:String!):BookingByInvoice!
    getDashBoardMetaData(startDate:String!,endDate:String!):DashBoardMetaDataResult!
    getAllBookings(page:Int,perPage:Int):GetAllBookings!
}  
    type Subscription{
        newBookingNoti:String!
    }
`)