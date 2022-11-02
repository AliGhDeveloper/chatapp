import { ApolloServer, UserInputError, AuthenticationError } from 'apollo-server-micro';
import { typeDefs } from 'apollo/types';
import db_connect from 'utils/db_connect';
import Users from 'models/Users';
db_connect();


const resolvers = {
    Query: {
      getUsers: async(_, {token}) => {
        const Error = new AuthenticationError('no token found!', {status: 401})
        if(!token) return Error
        
        const valid = validAcToken(token);
        if(!valid) return Error

        const users = await Users.find();

        return users

      },
      getUsers: async(_, {token}) => {
        const Error = new AuthenticationError('no token found!', {status: 401})
        if(!token) return Error
        
        const valid = validAcToken(token);
        if(!valid) return Error

        const users = await Users.find();

        return users

      },
    },
    Mutation : {
      addUser : async(parent, {username, email, password, socketid}) => {
        if(!username || !email || !password ) return new UserInputError('please add all fields!', {status: 404})
        const newUser = new Users({username, email, password, socketid, online: false});
        await newUser.save();
        return newUser
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