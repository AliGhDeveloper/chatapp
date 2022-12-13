import { pusher } from './index';


export default async function socketHandler (req, res) {
        const {
            typing,
            senderid,
            sender 
        } = req.body
        const response = await pusher.trigger('chat-app2', 'chat-feedback', {
            typing, 
            senderid,
            sender 
        })
        
}