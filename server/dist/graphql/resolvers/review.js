import { canReview, createAndUpdateReview, deleteReview } from "../../controller/review.js";
export const reviewResolvers = {
    Mutation: {
        createAndUpdateReview: async (_, { reviewInput }, { userId }) => await createAndUpdateReview(reviewInput, userId),
        deleteReview: async (_, { reviewId }, { user }) => await deleteReview(reviewId, user)
    },
    Query: {
        canReview: async (_, { roomId }, { userId }) => await canReview(roomId, userId)
    }
};
