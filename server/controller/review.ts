import errorHandler from "../lib/errorHandler";
import {Review} from "../model/review";
import type {ReviewInput} from "../lib/type";
import {Booking} from "../model/booking";
import {Room} from "../model/room";

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