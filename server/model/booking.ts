import mongoose, {model, Schema} from "mongoose";
import {type IBooking, PaymentMethods, PaymentStatus} from "../lib/type";

const bookingSchema = new Schema<IBooking>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Room',
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    customer:{
        type:{
            name:String,
            email:String
        }
    },
    rentPerDay:{
        type:Number,
        required:true
    },
    amount:{
        type:{
            rent:Number,
            discount:Number,
            tax:Number,
            total:Number
        }
    },
    dayOfRent:{
        type:Number,
        required:true
    },
        paymentInfo: {
            id:String,
            status: {
                type: String,
                enum:{values:PaymentStatus,message:'invalid payment status'},
                default: "pending",
                //required: true
            },
            method: {
                type: String,
                enum:{values:PaymentMethods,message:'invalid payment methods'},
                //required: true
            }
        },
    additionalNote:String
},{
    timestamps:true
})

export const Booking = model('Booking',bookingSchema)
