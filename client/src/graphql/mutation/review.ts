import {gql} from "@apollo/client";

export const CREATE_UPDATE_REVIEW =gql(`
    mutation Mutation($reviewInput: ReviewInput) {
        createAndUpdateReview(reviewInput: $reviewInput) {
            id
        }
    }`)

export const DELETE_REVIEW = gql(`
    mutation Mutation($reviewId: String!) {
        deleteReview(reviewId: $reviewId)
    }`)