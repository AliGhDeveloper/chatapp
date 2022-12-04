import { ApolloServer, UserInputError, AuthenticationError, ApolloError } from 'apollo-server-micro';
import { typeDefs } from 'apollo/types';
import db_connect from 'utils/db_connect';
import Users from 'models/Users';
import bcrypt from 'bcrypt';
import { accessToken, refreshToken, validRefToken, validAcToken } from 'utils/tokenGenerate';
import { setCookie } from 'cookies-next';
import Rooms from 'models/Rooms';


db_connect();


const resolvers = {
    Query: {
      getRoom : async(parent, {id, token, limit, page}) => {
        
        const Error = new AuthenticationError('no token found!', {status: 401})
        if(!token) return Error
        
        const valid = await validAcToken(token);
        
        if(!valid) return Error

        if(page !== undefined && limit !== undefined) {
          const room = await Rooms.findOne({_id : id}, { messages: { $slice: [page * limit, limit] }})
          if(!room.members.includes(valid.id)) return Error;
          return room
        } else {
          const room = await Rooms.findOne({ _id : id })
          return room
        }
      

      },
      getUser: async(_, {id}) => {
        
        const user = await Users.findOne({ _id : id });
        return user
      },
      getUsers: async(_, {username,token}) => {
        // const Error = new AuthenticationError('no token found!', {status: 401})
        // if(!token) return Error
        
        // const valid = validAcToken(token);
        // if(!valid) return Error

        if(username) {
          const users = await Users.find({username : {$regex : username} });
          return users
        }
        
      },
      login: async(_ ,{ email, password }, {req, res}) => {

        if( !email || !password ) return new UserInputError('please add all fields!', {status: 404});

        const user = await Users.findOne({ email });
        
        if(!user) return new ApolloError('user not found',"", {status: 404})

        const valid = await bcrypt.compare(password, user.password);

        if(!valid) return new AuthenticationError('password is not correct', {status: 401});
        
        const accesstoken = await accessToken(user);
        
        const refreshtoken = await refreshToken(user)
        setCookie('refreshtoken', refreshtoken, {req, res, maxAge : 3600000 * 7 })
        return {
          accesstoken,
          user
        }
      },
      refresh : async(parent, _, { req, res }) => {
        let error = new AuthenticationError('authentication error', {status: 401});
        const { refreshtoken } = req.cookies;

        const verify = await validRefToken(refreshtoken);
        if(!verify.id) return error

        const user = await Users.findById(verify.id);

        if(!user) return error; 
        
        
        const accesstoken = await accessToken(user);

        return { 
          accesstoken,
          user
        }
      }
    },
    User : {
      friends : async(parent) => {
        
        const friends = await Users.find({_id : {$in : parent.friends}})
        
        return friends
      },
      rooms : async(parent) => {
        const rooms = await Rooms.find({ _id : { $in : parent.rooms }});
        return rooms
      }
    },
    Room : {
      members : async(parent) => {
        
        const members = await Users.find({_id : {$in : parent.members}})
        
        return members
      }
    },
    Mutation : {
      addFriend : async(_, { friendid, token }) => {

        const Error = new AuthenticationError('authentication error', {status: 401});
        if(!token) return Error;


        const valid = await validAcToken(token);
        if(!valid) return Error;
    
        const user = await Users.findById(valid.id);

        let friends = user.friends;
        friends.push(friendid);
        await Users.findOneAndUpdate({_id : valid.id}, { friends })
      },
      addUser : async(parent, {username, email, password}, {_, res}) => {
        if(!username || !email || !password ) return new UserInputError('please add all fields!', {status: 404});
        
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new Users({username, email, password: hashedPassword, socketid: '1'});
        await newUser.save();
        
        
        return newUser
      },
      createRoom : async(_, { members }) => {
        if(members.length < 0 ) return new UserInputError('please add at least one member', {status: 400});

        const newRoom = new Rooms({members, message: [], name: "New Group"});
        
        members.forEach(async(id) => {
          await Users.findOneAndUpdate({ _id : id }, {$push: {rooms : newRoom._id}} )
        })
        await newRoom.save();

        return newRoom
      },
      addMembers : async(_, {newMembers, name, avatar, id}) => {
        let updatedRoom
        const roomid = id
        if(newMembers.length > 0) {
          updatedRoom = await Rooms.findOneAndUpdate({ _id : roomid },{$push : { members : {$each : newMembers}}})
          newMembers.forEach(async(id) => {
            await Users.findOneAndUpdate({ _id : id }, {$push: {rooms : roomid}} )
          })
        }
        return updatedRoom
      },
      updateRoom : async(_, { data, id}) => {
        console.log(data)
        if(!data.name && !data.avatar) return new UserInputError('please insert atlease one field', { status: 400 });
        const updatedRoom = await Rooms.findOneAndUpdate({ _id : id }, data)
        return updatedRoom
      }

    }
};



export default async function handler(req, res) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context : {req, res}
  });

  const startServer = apolloServer.start();

  if(req.method == 'OPTIONS'){
    res.setHeader('Access-Control-Allow-Methods', 'POST')
    return res.status(200).send('ok')
  } else {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      await startServer;
      
      await apolloServer.createHandler({
        path: '/api/graphql',
      })(req, res);

  }
};

export const config = {
    api: {
      bodyParser: false,
    },
};