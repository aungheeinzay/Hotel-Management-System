import type {ReviewInput} from "../../lib/type";
import {canReview, createAndUpdateReview} from "../../controller/review";


export const reviewResolvers={
    Mutation:{
        createAndUpdateReview:async(_:any,{reviewInput}:{reviewInput:ReviewInput},{userId}:{userId:string})=>await createAndUpdateReview(reviewInput,userId)
    },
    Query:{
        canReview:async(_:any,{roomId}:{roomId:string},{userId}:{userId:string})=>await canReview(roomId,userId)
    }

}