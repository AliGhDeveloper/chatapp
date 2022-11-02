import { gql } from "@apollo/client";

export const getUsers = gql`
    query GET_USERS {
        getUsers {
            username
        }
    }
`