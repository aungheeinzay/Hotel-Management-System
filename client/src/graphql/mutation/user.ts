import {gql} from "@apollo/client";

export const REGISTER_USER=gql`
    mutation Register($userInput: RegisterInput) {
        register(userInput: $userInput) {
            id
            username
            email

            role
            createdAt
            updatedAt
        }
    }

`;

export const LOGIN_USER = gql(`
    mutation Login($userInput: LoginInput) {
        login(userInput: $userInput) {
            id
            username
            email

            role
            createdAt
            updatedAt
        }
    }`)

export const AVATAR_UPLOAD=gql`
    mutation Avatar($image: String!) {
        uploadAvatar(image: $image)
    }
`;

export const USERNAME_EMAIL_UPDATE=gql`
    mutation updateProfile( $profileInput: ProfileInput) {
        updateProfile( profileInput: $profileInput)
    }`;

export const UPDATE_PASSWORD = gql`
    mutation updatePassword($oldPassword: String!, $newPassword: String!) {
        updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
    }
`;

export const FORGET_PASSWORD = gql`
    mutation forgetPassword($customerEmail: String!) {
        forgetPassword(customerEmail: $customerEmail)
    }`;

export const RESET_PASSWORD = gql`
    mutation ResetPassword($token: String!, $newPassword: String!) {
        resetPassword(token: $token, newPassword: $newPassword)
    }
`;