import { addFriends, createRoom } from "utils/queries";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router';

export default function Room({room}){
    const router = useRouter();
    // const [ createroom, roomdata ] = useMutation(createRoom);
    // const [addfriend, data] = useMutation(addFriends);
    // console.log(roomdata)
    // const friends = searcher.friends.map(friend => friend.id);

    // const handleMessage = () => {
    //     createroom({ 
    //         variables : { members : [user.id, searcher.id]}
    //     }).then(result => {
    //         if(result.data && result.data.createRoom) router.push(`/chatroom/${result.data.createRoom.id}`)
    //     })
    // }

    // const handleClick = () => {
    //     addfriend({
    //         variables : {friendid: user.id, token}
    //     })
    // }


    return (
        <div className="room d-flex align-items-center" onClick={() => router.push(`/chatroom/${room.id}`)}>
            <div className="d-flex align-items-center" >
                <img className="img-rounded mx-3" src={room.avatar} />
                <h6>{room.name}</h6>
            </div>
            
        </div>
    )
}