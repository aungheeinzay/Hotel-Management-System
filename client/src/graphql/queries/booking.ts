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

export const GET_MY_BOOKING= gql(`
    query GetRoomById {
        getBookingByUserId {
            meta {
                unPaidBooking
                needToPay
                totalBooking
            }
            bookings {
                room {
                    id
                    title
                }
                endDate
                startDate
                paymentInfo {
                    method
                    status
                }
                amount {
                    total
                }
                id
            }
        }
    }`)