import { useContext } from 'react';
import { Context } from 'store/globalstore';
import Room from 'components/room';
export default function Home() {
  const { state : { auth } } = useContext(Context);


  return(
    <div className="container pt-5">
      <div className="chats d-flex flex-column">
        { 
          auth.user && auth.user.rooms.map(room => {
            return <Room key={room.id} room={room} /> 
          })
        }
      </div>
    </div>
  )
}