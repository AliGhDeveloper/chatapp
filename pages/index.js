import { useQuery } from '@apollo/client'
import { getUsers } from 'utils/queries'
export default function Home() {

  const users = useQuery(getUsers);

  console.log(users)

  return(
    <div className="container">
      <div className="chats d-flex flex-column">
        
      </div>
    </div>
  )
}