import {gql} from "@apollo/client";

export const CREATE_BOOKING=gql(`
    mutation Mutation($bookingInfo: BookingInput) {
        createBooking(bookingInfo: $bookingInfo)
    }
`)

export const UPDATE_PAYMENT=gql(`
    mutation UpdateBooking($bookingId: String!, $bookingInput: UpdateBookingPaymentInput) {
        updateBooking(bookingId: $bookingId, bookingInput: $bookingInput)
    }`)