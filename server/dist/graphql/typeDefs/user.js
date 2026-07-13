import { gql } from "graphql-tag";
export const userTypeDefs = gql `
type Avatar{
    url:String
    publc_id:String
}   
type User{
    id:ID!
    username:String!
    email:String!
    avatar:Avatar   
    role:[String]
    createdAt:String!
    updatedAt:String!
    
}

input RegisterInput{
    username:String!
    email:String!
    password:String!
}
input LoginInput{
    email:String!
    password:String!
}
input ProfileInput{
    username:String
    email:String
}

extend type Query {
    currentUser:User
    logout:Boolean
}

extend type Mutation{
    register(userInput:RegisterInput):User
    login(userInput:LoginInput):User
    uploadAvatar(image:String!):Boolean
    updateProfile(profileInput:ProfileInput):Boolean
    updatePassword(oldPassword:String!,newPassword:String!):Boolean
    forgetPassword(customerEmail:String!):Boolean
    resetPassword(token:String!,newPassword:String!):Boolean
}
`;
