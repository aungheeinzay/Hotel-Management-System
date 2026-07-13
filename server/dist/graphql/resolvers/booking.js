import { createBooking, getAllBookings, getBookedDays, getBookingById, getBookingByUserId, getBookingForInvoice, getDashBoardMetaData, updateBookingPayment } from "../../controller/Booking.js";
import { pubsub } from "../../apollo/pubsub.js";
export const bookingResolvers = {
    Subscription: {
        newBookingNoti: {
            subscribe: () => pubsub.asyncIterableIterator(['NEW_BOOKING'])
        }
    },
    Mutation: {
        createBooking: async (_, { bookingInfo }, { userId }) => await createBooking(bookingInfo, userId),
        updateBooking: async (_, { bookingId, bookingInput }, { user }) => await updateBookingPayment(bookingId, bookingInput, user)
    },
    Query: {
        getBookingById: async (_, { bookingId }, { userId }) => await getBookingById(bookingId, userId),
        getBookedDays: async (_, { roomId }) => await getBookedDays(roomId),
        getBookingByUserId: async (_, __, { userId }) => await getBookingByUserId(userId),
        getBookingForInvoice: async (_, { bookingId }) => getBookingForInvoice(bookingId),
        getDashBoardMetaData: async (_, { startDate, endDate }) => await getDashBoardMetaData(startDate, endDate),
        getAllBookings: async (_, { page, perPage }, { user }) => await getAllBookings(user, page, perPage)
    }
};
