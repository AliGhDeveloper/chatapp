import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import Users from 'models/Users';
import Rooms from 'models/Rooms';
export default function socketHandler (req, res) {
    
    if(res.socket.server.io){
        console.log('socketserver already exist')
    } else {
        console.log('initializing socket server...')
        const io = new Server(res.socket.server);
        res.socket.server.io = io
        let userid;

        io.use(async(socket, next) => {
                const {token} = socket.handshake.auth
                console.log("token: ", token)
                let error;
            
                if(!token) {
                    error = new Error('authorization error');
                    error.data = { content : "please login first then try again", redirectURL: '/login'}
                } else {
                    try {
                        const verify = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                        
                        if(!verify.id) {
                            error = new Error('authorization error');
                            error.data = { content : "please login first then try again", redirectURL: '/login'}
                        }
    
                        userid = verify.id
                    } catch(error) {
                        error = new Error(error.message);
                        error.data = { content: null, redirectURL: '/login'}
                    }
                }
                
                

                if(error) {
                    console.log("somthing went wrong making socket connection!");
                    return next(error)
                }

                next()
            
        })

        io.on('connection', async(socket) => {
            console.log('socket connected', socket.id);
            await Users.findOneAndUpdate({ _id : userid }, { socketid : socket.id })

           
            socket.on('join group', roomid => {
                socket.join(roomid);
                socket.on('message',async (data) => {
                    console.log(data)
                    await Rooms.findOneAndUpdate({ _id : roomid }, {$push: {messages : { $each: [{content: data.content, sender: data.sender, senderid: data.senderid , time: data.time}], $position: 0 }}})
                    io.sockets.in(roomid).emit('message', data)
                })
            }) 
        }) 
    } 

    res.end();
}