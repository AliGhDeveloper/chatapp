import { useRouter } from "next/router"
import { useLazyQuery, useQuery } from '@apollo/client';
import { getRoom } from "utils/queries";
import { Context } from "store/globalstore";
import { useContext, useEffect, useRef, useState } from "react";
import ChatBar from "components/layout/chatbar";
import {socket} from "utils/socketConnection";
import Message from "components/message";

export default function ChatRoom() {
    
    const { state: { auth } } = useContext(Context);
    const router = useRouter();
    const [ page, setPage ] = useState(0);
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(null)
    const [getroomdata, roomdata] = useLazyQuery(getRoom, {
        variables : { id : router.query.id, token: auth.accesstoken, page, limit: 4 }
    });

    useEffect(() => {
        getroomdata()
        .then(result => {
            console.log(result)
            if(result.data && result.data.getRoom) {
                setMessages([...messages, ...result.data.getRoom.messages])
                if(page === 0) {
                    socket.emit('join group', result.data.getRoom.id)
                }
            }
        })
    }, [page])

    const handleScroll = () => {
        if(window.scrollY === 0) {
            setPage(page + 1)
        }
    }

    window.addEventListener('scroll', handleScroll);

    useEffect(() => {
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[])
    
    const bookmark = useRef();
    const lastmessage = useRef();

    useEffect(() => {
        if(bookmark.current) {
            if(page < 1){
                bookmark.current.scrollIntoView()
            } else {
                if(lastmessage.current) {
                    lastmessage.current.scrollIntoView({ block: 'center'})
                }
            }
        }
    }, [messages])

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        if(newMessage) setMessages([newMessage, ...messages])
    }, [newMessage])

    useEffect(() => {
        socket.on('message', message => {
            setNewMessage(message)
        })
    }, [socket])



    const handleClick = () => {
        if(!message) return console.log('please at least type sth');
        socket.emit('message', {
            senderid: auth.user.id ,
            content : message,
            sender : auth.user.username,
            time : new Date(),
            recivers : roomdata.data.getRoom.members.filter(member => member.id !== auth.user.id).map(member => member.id)
        })
        setMessage('')
    }


    return (
        <div className="container-fluid chatroom" >
            <div>
                <div className="chat-content container">
                    <span ref={bookmark}></span>
                    {
                        messages.map((message,index) => {
                            
                            return (
                                <Message index={index} lastmessage={lastmessage} length={messages.length} key={index} auth={auth} data={message}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className="chatinputs row bg-light">
                <div className="col-md-7 mx-auto d-flex">
                    <input className="form-control py-3 form-control-sm" value={message} onChange={(e) => handleChange(e)} placeholder="write your message" />
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

