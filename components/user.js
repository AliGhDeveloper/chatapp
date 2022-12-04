import { addFriends, createRoom } from "utils/queries";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router';

export default function User({ user, searcher, showSelf, newMembers, setter, select}){
    

    const router = useRouter();
    const [ createroom, roomdata ] = useMutation(createRoom);
    

    const handleMessage = () => {
        createroom({ 
            variables : { members : [user.id, searcher.id]}
        }).then(result => {
            if(result.data && result.data.createRoom) router.push(`/chatroom/${result.data.createRoom.id}`)
        })
    }

    const handleChange = (e) => {
        if(e.target.checked) {
           setter([...newMembers, user.id])
        } else  {
            setter([...newMembers].filter(id => id != user.id))
        }
    }

    if(user.id === searcher.id && !showSelf ) return null

    return (
        <div className="user d-flex align-items-center " >
            <div className="d-flex align-items-center" >
                <img className="img-rounded ms-3 me-4" src={user.avatar} onClick={() => router.push(`/user/info/${user.id}`)}/>
                <h6>{user.username}</h6>
            </div>
            {
                select && 
                <input type="checkbox" onChange={(e) => handleChange(e)}/>
            }
        </div>
    )
}