import {gql} from "@apollo/client";

export const GET_BOOKING_BY_ID=gql(`
    query Query($bookingId: String!) {
        getBookingById(bookingId: $bookingId) {
            id
            user
            room
            startDate
            endDate
            customer {
                name
                email
            }
            amount {
                tax
                total
                rent
                discount
            }
            dayOfRent
            rentPerDay
            additionalNote
            createdAt
            updatedAt
        }
    }`)