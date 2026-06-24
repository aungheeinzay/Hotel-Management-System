import {gql} from "@apollo/client";

export const CURRENT_USER = gql`
    query CurrentUser {
        currentUser {
            id
            username
            email
            avatar {
                url
            }
            role
            createdAt
            updatedAt
        }
    }
`;

export const LOGOUT =gql`
    query Logout {
        logout
    }
`;