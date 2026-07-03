import {stripeCheckOutSession} from "../../controller/Payment";

export const paymentResolver={
    Mutation:{
        stripeCheckoutSession:async(_:any,{bookingId}:{bookingId:string})=>await stripeCheckOutSession(bookingId)
    }
}