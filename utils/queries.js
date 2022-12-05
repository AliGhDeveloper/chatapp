import { gql } from "@apollo/client";

export const getUsers = gql`
    query GET_USERS($username:String) {
        getUsers (username: $username){
            username
            online
            email
            avatar
            id
        }
    }
`;


export const getUser = gql`
    query GET_USER($id : ID) {
        getUser(id : $id) {
            username
            email
            online
            avatar
            id
        }
    }
`

export const addFriends = gql`
    mutation ADD_FRIENDS($friendid : ID, $token: String) {
        addFriend(friendid : $friendid, token : $token){
            username
        }
    }
`



export const register = gql`
    mutation REGISTER($username : String!, $email: String!, $password: String!) {
        addUser(email : $email, password : $password, username : $username) { 
            username
            email
            password
            online 
            id
            
        }
    }
`
export const login = gql`
    query LOGIN( $email: String!, $password: String!) {
        login(email : $email, password : $password) { 
            accesstoken 
            refreshtoken
            user {
                id
                username
                email
                socketid
                rooms { 
                    avatar
                    id
                    name
                }
                friends {
                    username
                }
            }
        }
    }
`

export const addMembers = gql`
    mutation ADD_MEMBERS($id : ID!, $newMembers: [String]) { 
        addMembers(newMembers : $newMembers, id : $id) {
            name
        }
    }
`;  

export const updateRoom = gql`
    mutation UPDATE_ROOM($id : ID!, $data: Data) {
        updateRoom(id : $id, data: $data) {
           name 
           avatar 
        }
    }
`

export const refresh = gql`
    query REFRESH {
        refresh { 
            accesstoken 
            user {
                avatar
                id
                username
                email
                socketid
                rooms { 
                    avatar
                    id
                    name
                }
                friends {
                    id
                    avatar
                    username
                }
            }
        }
    }
`;


export const createRoom = gql`
    mutation CREATE_ROOM($members : [String]!, $name: String, $avatar: String) {
        createRoom(members : $members, name: $name, avatar: $avatar) {
            id
        }
    }
`

export const getRoom = gql`
    query GET_ROOM($id: ID, $token : String, $page: Int, $limit: Int){
        getRoom(id : $id, token : $token, page: $page, limit: $limit) {
            id 
            avatar
            name
            members { 
                username
                id
                avatar
            }
            messages {
                senderid
                content
                sender
                time
            }
        }
    }
`;

