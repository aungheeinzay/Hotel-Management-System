import errorHandler from "../lib/errorHandler.js";
import {Review} from "../model/review.js";
import type {ReviewInput, UserType} from "../lib/type.js";
import {Booking} from "../model/booking.js";
import {Room} from "../model/room.js";

export const createAndUpdateReview = errorHandler(async (reviewInput: ReviewInput, user: string) => {
    const can = await canReview(reviewInput.room, user)
    if (!can){
        throw new Error("cannot review for these room")
    }

    let review = await Review.findOne({
        room: reviewInput.room,
        user
    })

    if (!review){

        review = await Review.create({ ...reviewInput, user })

        await Room.findByIdAndUpdate(review.room, {
            $push: { reviews: review.id }
        })
    } else {
        await review.set({ ...reviewInput }).save()
    }

    return await review.populate(['user', 'room']);
})

export const canReview = errorHandler(async (roomId:string,userId:string)=>{
    const booking = await Booking.findOne({
        room:roomId,
        user:userId,
        "paymentInfo.status":"paid"
    })
    return !!booking
})

export const deleteReview =errorHandler(async (reviewId:string,user:UserType)=>{
    const isAdmin = user.role?.includes("admin")
    if (!isAdmin)throw new Error("Unauthorized to delete a review")
    await Review.findByIdAndDelete(reviewId)
    return true
})