import { gql } from "graphql-tag";
export const PaymentTypeDefs = gql `
    type  StripeSession{
        url:String
    }
extend type Mutation{
stripeCheckoutSession(bookingId:String!):StripeSession!
}
`;
