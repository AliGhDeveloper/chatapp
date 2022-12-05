import { useRouter } from "next/router"
import { useQuery } from '@apollo/client';
import { getRoom } from "utils/queries";
import { Context } from "store/globalstore";
import { useContext } from "react";
import Link from "next/link";
export default function ChatBar(){
    const { state: { auth } } = useContext(Context);
    const router = useRouter();
    const roomdata = useQuery(getRoom, {
        variables : { id : router.query.id, token: auth.accesstoken}
    });
    
    if(!roomdata.data) return null
    return (
        <nav className="navbar bg-light">
            
            <div className="container-fluid navs" >
                <div className="navitems d-flex align-items-center">
                    <button className="btn btn-sm" style={{width : '40px', height: '40px', borderRadius: '50%', padding:0}} onClick={() => router.push('/')}><i className="bi bi-arrow-left-short text-primary" style={{fontSize: "30px"}}></i></button> 
                </div>  
                <span className="text-muted" style={{fontSize: "13px"}}>{roomdata.data.getRoom.members.length} members</span>
                <Link href={`/chatroom/info/${roomdata.data.getRoom.id}`}> 
                    <div>
                        <img className="groupAvatar me-2" src={roomdata.data.getRoom.avatar} style={{width: '55px', height: '55px'}} />
                        <span>{roomdata.data.getRoom.name}</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}