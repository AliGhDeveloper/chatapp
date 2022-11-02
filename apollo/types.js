
import { gql } from "apollo-server-micro";

export const typeDefs = gql`
type User {
    id : ID!
    username : String!
    password : String!
    online : Boolean!
    socketid : String!
}

type Query {
    getUsers : [User]

    getUser(id : String) : User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!, socketid: String!) : User
}
`;