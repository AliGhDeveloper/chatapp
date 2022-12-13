import { client } from 'apollo/apollo';
import { getUser } from 'utils/queries';
import { request } from 'graphql-request';
import { addFriends, removeFriend, refresh } from "utils/queries";
import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from 'react';
import { Context } from 'store/globalstore';
import Link from 'next/link';


export default function UserInfo({ user }) {
    const { state : { auth } } = useContext(Context);
    const [ online, setOnline ] = useState(null);
    useEffect(() => {
        if(auth.user.id === user.id){
            setOnline(true)
        } else {
            setOnline(user.online)
        }
    }, [auth, online])
    const friends = auth.user && auth.user.friends.map(friend => friend.id);

    const [addfriend, data] = useMutation(addFriends);
    const [remove] = useMutation(removeFriend);
    const handleClick = () => {
        addfriend({
            variables : {friendid: user.id, token : auth.accesstoken},
            refetchQueries : [refresh]
        })
    }

    const handleRemove = () => {
        remove({
            variables : { id: auth.user.id, friendid: user.id},
            refetchQueries : [refresh]
        })
    }

    if(!user) return null
    return (
       <div className="userinfo" >
        <div className="poster bg-light w-100" >
            <div className="container d-flex justify-content-between align-items-center">
                <img className="avatar" src={user.avatar}/>
                <div className="d-flex">
                    {
                        auth.user && auth.user.id !== user.id  ?
                        <>
                            <Link href={`/chatroom/create/${user.id}`}><i className="addfriend bi bi-chat-left"></i></ Link>
                            {
                                !friends.includes(user.id) ?
                                <img className="addfriend mx-3" onClick={handleClick}  src={'/person-plus.svg'} />
                                : <button className="btn btn-danger remove mx-3" onClick={handleRemove}>Remove</button>
                            }
                        </>
                        :
                        null
                        }
                </div>
            </div>
        </div>
        <div className="container inf">
            <div className="d-flex flex-column">
                <span>Bio :  </span>
                <h3>user info</h3>
                <span>username : {user.username} </span>
                <span>email : {user.email} </span>
                <span>status : {online ? <>online<span className="online">&nbsp;</span></> : <>offline<span className="offline"></span></>  }</span>
            </div>
        </div>
       </div> 
    )
}

export const getServerSideProps = async({ params }) => {

    const user = await request(`${process.env.BASE_URL}/graphql`, getUser, {
        id : params.id
    })
    console.log(user)

    return {
        props: {
            user : user.getUser ? user.getUser : null
        }
    }
}

UserInfo.getLayout = function pageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}