import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import Users from 'models/Users';
import Rooms from 'models/Rooms';
import Pusher from 'pusher';

export const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: process.env.CLUSTER,
    useTLS: true,
});

export default async function socketHandler (req, res) {
        console.log('req sent')
        const {
            senderid,
            content,
            sender ,
            time ,
            recivers,
            roomid 
        }  = req.body
        if( !senderid || !content || !time || !sender || recivers.length < 1 || !roomid ) return res.status(400).json({ error : 'please add all fields'})
        try { 
            const updatedRoom = await Rooms.findOneAndUpdate({ _id : roomid }, {$push: {messages : { $each: [{content , sender, senderid, time}], $position: 0 }}})
            if(!updatedRoom) return res.status(404).json({ error: "room not found"})
            const response = await pusher.trigger('chat-app2', 'chat-message', {
                senderid,
                content,
                sender ,
                time ,
                recivers 
            })
            
            return res.status(200).json({ success : 'message sent'})
        } catch ( error ) {
            console.log({ error : error.message })
        }
}