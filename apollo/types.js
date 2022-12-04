
import { gql } from "apollo-server-micro";

export const typeDefs = gql`

scalar Date

scalar Data

type User {
    id : ID
    avatar : String
    username : String
    email : String
    password : String
    online : Boolean
    socketid : String
    rooms : [Room]
    friends : [User]
}


type Message {
    sender: String
    time : Date
    content : String
}

type Room {
    id : ID
    avatar : String
    name : String
    members : [User]
    messages : [Message]
}

type Login {
    accesstoken : String
    refreshtoken : String
    user : User
}

type Query {
    getUsers(username: String) : [User]

    getRoom(id: ID, token: String, limit: Int, page: Int): Room

    getRooms(token: String!) : [Room]

    getUser(id : ID) : User

    login(email : String!, password: String!) : Login

    refresh : Login
}

type Mutation {
    addUser(username: String!, email: String!, password: String!) : User

    createRoom(members: [String]!) : Room

    addMembers(id : ID!, newMembers: [String]) : Room

    updateRoom(id : ID!, data: Data ) : Room

    addFriend(friendid: ID, token: String) : User
}
`;