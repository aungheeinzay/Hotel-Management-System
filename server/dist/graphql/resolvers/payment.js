import { stripeCheckOutSession } from "../../controller/Payment.js";
export const paymentResolver = {
    Mutation: {
        stripeCheckoutSession: async (_, { bookingId }) => await stripeCheckOutSession(bookingId)
    }
};
