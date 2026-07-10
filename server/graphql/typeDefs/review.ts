import gql from "graphql-tag";

export const reviewTypeDefs = gql(`
    type Reviews{
        id:ID!
        user:User
        room:Room
        rating:Float
        comment:String
        createdAt:String
        updatedAt:String
    }
    input ReviewInput{
        room:String!
        rating:Float!
        comment:String
    }
    
extend type Mutation {
    createAndUpdateReview(reviewInput:ReviewInput):Reviews
    deleteReview(reviewId:String!):Boolean
}
    
    extend type Query {
        canReview(roomId:String!):Boolean
    }
`)