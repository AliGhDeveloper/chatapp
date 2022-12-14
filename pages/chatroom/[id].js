import { useRouter } from "next/router"
import { useLazyQuery } from '@apollo/client';
import { getRoom } from "utils/queries";
import { Context } from "store/globalstore";
import { useContext, useEffect, useRef, useState } from "react";
import ChatBar from "components/layout/chatbar";
import Message from "components/message";
import Pusher from 'pusher-js';
import { postData } from "utils/fetchData";
export default function ChatRoom() {
    
    const { state: { auth } } = useContext(Context);
    const limit = 4
    const router = useRouter();
    const [ page, setPage ] = useState(0);
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('')
    const [getroomdata, roomdata] = useLazyQuery(getRoom, {
        variables : { id : router.query.id, token: auth.accesstoken, page, limit }
    });

    useEffect(() => {
        if(message) {
            setMessages([message, ...messages])
        }
    }, [message])


    const scrollEvent = () => {
        if(window.scrollY === 0) {
            setPage(page + 1)
        }
    }

    window.addEventListener('scroll', (e) => scrollEvent(e));

    useEffect(() => {
        
        const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
            cluster:  "ap1"
        });

        const channel = pusher.subscribe('chat-app2');

        channel.bind('chat-message', (data) => {
            if(auth.user && auth.user.id !== data.senderid) {
                setMessage( data )
            }
        })
        
        return () => {
            pusher.unsubscribe('chat-app');
        }
    },[])

    useEffect(() => {
        return () => {
            window.removeEventListener('scroll', scrollEvent);
        }
    }, [])

    useEffect(() => {
        getroomdata()
        .then(result => {
            if(result.data && result.data.getRoom && result.data.getRoom.messages.length > 0) {
                setMessages([ ...messages, ...result.data.getRoom.messages,])
            }
        })
    }, [page])
   
    const bookmark = useRef();
    const lastmessage = useRef();
    
    useEffect(() => {
        if(bookmark.current) {
            if(page < 1){
                bookmark.current.scrollIntoView()
            } 
            else {
                if(lastmessage.current) {
                    lastmessage.current.scrollIntoView()
                }
            }
        }
    }, [messages])

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleClick = async () => {
        if(!newMessage) return console.log('please at least type sth');
        const data = {
            roomid : router.query.id,
            senderid: auth.user.id ,
            content : newMessage,
            sender : auth.user.username,
            time : new Date(),
            recivers : roomdata.data.getRoom.members.filter(member => member.id !== auth.user.id).map(member => member.id)
        };
        
        setMessages([ data, ...messages ])
        await postData('/pusher', data);
       
    }

    const handleKeyup = async () => {
        const data = {
            typing : true,
            roomid : router.query.id,
            senderid: auth.user.id ,
            sender : auth.user.username,
        };
        
    }
    
    return (
        <div className="container-fluid chatroom" >
            <div>
                <div className="chat-content container">
                    <span ref={bookmark}></span>
                    {
                        messages.map((item,index) => {
                            
                            return (
                                <Message index={index} lastmessage={lastmessage} limit={limit} length={messages.length} key={index} auth={auth} data={item}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className="chatinputs row bg-light">
                <div className="col-md-7 mx-auto d-flex">
                    <input className="form-control py-3 form-control-sm" value={newMessage} onChange={(e) => handleChange(e)} placeholder="write your message" onKeyUp={handleKeyup} />
                    <button onClick={handleClick} className="btn btn-primary">send</button>
                </div>
            </div>
        </div>
    )
};

ChatRoom.getLayout = function pageLayout(page){
    
    return (
        <>
            <ChatBar  />
            {page}
        </>
    )
}

