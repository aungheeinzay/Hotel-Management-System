import {gql} from "@apollo/client";

export const STRIPE_CHECKOUT_SESSION = gql(`
    mutation Mutation($bookingId: String!) {
        stripeCheckoutSession(bookingId: $bookingId) {
            url
        }
    }`)