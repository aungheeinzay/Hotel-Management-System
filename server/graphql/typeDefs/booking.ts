import gql from "graphql-tag";
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
        id:ID!
        status:String!
        method:String!
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
#    paymentInfo:PaymentInfo
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
extend type  Mutation{
createBooking(bookingInfo:BookingInput):String!
    updateBooking(bookingId:String!,bookingInput:UpdateBookingPaymentInput):Boolean
}
    
extend type Query{
    getBookingById(bookingId:String!):Booking
}  
`)