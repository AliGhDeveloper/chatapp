import { useContext, useState, useEffect } from 'react';
import { Context } from 'store/globalstore';
import { useRouter } from 'next/router';
import { getUsers } from 'utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useQuery, useMutation } from "@apollo/client"
import { getRoom, addMembers } from "utils/queries"
import User from 'components/user';

export default function Friends() {
    const [ search, user ] = useLazyQuery(getUsers);
    const router = useRouter();
    const { state:{ auth } } = useContext(Context);
    const [searching, setSearching] = useState(false);
    const [roomid] = router.query.roomid ? router.query.roomid : []
    const [ newMembers, setMembers ] = useState([]);
    const [ update ] = useMutation(addMembers)
    
    const roomdata = useQuery(getRoom, {
        variables : { id : roomid ? roomid : null, token: auth.accesstoken}
    });
    
    

    const handleChange = (e) => {
        search({
            variables : {username : e.target.value}
        })
    }

    const handleClick = () => {
        if(newMembers.length < 1) return console.log('please  select at least one member')
        update({
            variables : { id : roomid, newMembers }
        })
    }
    
    if(auth.loading) return <h1>Loading...</h1>
    if( roomdata.loading ) return <h1>Loading...</h1>
    if(!auth.accesstoken && !auth.user) return router.push('/login');
    else {
        return (
            <div className="container" style={{marginTop: "80px"}}>
                {
                    !searching ?
                    <>
                    {
                        roomid ? 
                        null :
                        <>
                            <div className="my-2 d-flex align-items-center">
                            <img className="addfriend mx-3"  src={'/person-plus.svg'} onClick={() => setSearching(true)}/>
                            <h4>Add Friend</h4>
                            </div>
                            <hr />
                        </>
                    }
                    <div className="friends d-flex flex-column">
                    <h4>Your Friends:</h4>
                    {
                        roomid && 
                        <div className='d-flex justify-content-end' >
                            <button className='btn btn-outline-success' onClick={handleClick}>Add Selected Members</button>
                        </div>
                    }
                    {
                        auth.user && auth.user.friends && auth.user.friends.length > 0 ?
                        auth.user.friends.map(friend => {
                            let members = [];
                            if(roomdata.data && roomdata.data.getRoom) members =  roomdata.data.getRoom.members.map(member => member.id);
                            if(members.length > 0 && !members.includes(friend.id)) {
                                return <User key={friend.id} user={friend} token={auth.accesstoken} newMembers={newMembers} setter={setMembers} searcher={auth.user} select={true}/>
                            } else {
                                return  <User key={friend.id} user={friend} token={auth.accesstoken} newMembers={newMembers} setter={setMembers} searcher={auth.user} />
                            }
                        })
                        : 
                        <span>U have no friends</span>
                    }
                    </div>  
                    </>
                    :
                    <>
                        <div className="usersearch">
                            <input onChange={(e) => handleChange(e)} name="username" className="form-control form-control-sm w-100 my-3" placeholder="search for the username..." />
                            <i className="bi bi-x" onClick={() => setSearching(false)}></i>
                        </div>
                        {
                            user.loading ? <h6>loading...</h6>
                            : user.data === undefined ? null
                            : user.data && user.data.getUsers ? user.data.getUsers.map(user =><User key={user.id} user={user} token={auth.accesstoken}  searcher={auth.user}/> )
                            : <h2>no users</h2>
                        }
                    </>
                }
            </div>
        )
    }
}



