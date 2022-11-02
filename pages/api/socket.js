import { Server } from 'socket.io';



export default function socketHandler (req, res) {
    
    if(res.socket.server.io){
        console.log('socket connection already stablished')
    } else {
        console.log('initializing socket connection...')
        const io = new Server(res.socket.server);
        res.socket.server.io = io
        
        io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            let error;
            if(!token) {
                error = new Error('authorization error');
                error.data = { content : "please login first then try again", redirectURL: '/login'}
            }

            
            if(error) return next(error);

            next()
        })

        io.on('connection', (socket) => {
            console.log('connected', socket.id);
            
            
            socket.on('message', (data) => {
                socket.emit('response', data)
            })
        }) 
    } 

    res.end();
}