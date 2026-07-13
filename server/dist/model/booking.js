import mongoose, { model, Schema } from "mongoose";
import { PaymentMethods, PaymentStatus } from "../lib/type.js";
const bookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    customer: {
        type: {
            name: String,
            email: String
        }
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    amount: {
        type: {
            rent: Number,
            discount: Number,
            tax: Number,
            total: Number
        }
    },
    dayOfRent: {
        type: Number,
        required: true
    },
    paymentInfo: {
        id: String,
        status: {
            type: String,
            enum: { values: PaymentStatus, message: 'invalid payment status' },
            default: "pending",
        },
        method: {
            type: String,
            enum: { values: PaymentMethods, message: 'invalid payment methods' },
        }
    },
    additionalNote: String
}, {
    timestamps: true
});
export const Booking = model('Booking', bookingSchema);
