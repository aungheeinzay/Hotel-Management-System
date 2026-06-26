import {gql} from "@apollo/client";

export const CREATE_BOOKING=gql(`
    mutation Mutation($bookingInfo: BookingInput) {
        createBooking(bookingInfo: $bookingInfo)
    }
`)