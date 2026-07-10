import type {ReviewInput, UserType} from "../../lib/type";
import {canReview, createAndUpdateReview, deleteReview} from "../../controller/review";


export const reviewResolvers={
    Mutation:{
        createAndUpdateReview:async(_:any,{reviewInput}:{reviewInput:ReviewInput},{userId}:{userId:string})=>await createAndUpdateReview(reviewInput,userId),
        deleteReview:async(_:any,{reviewId}:{reviewId:string},{user}:{user:UserType})=>await deleteReview(reviewId,user)
    },
    Query:{
        canReview:async(_:any,{roomId}:{roomId:string},{userId}:{userId:string})=>await canReview(roomId,userId)
    }

}