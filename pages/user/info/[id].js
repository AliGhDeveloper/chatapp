import { client } from 'apollo/apollo';
import { getUser } from 'utils/queries';
import { request } from 'graphql-request';
import { addFriends, refresh } from "utils/queries";
import { useMutation } from "@apollo/client";
import { useContext } from 'react';
import { Context } from 'store/globalstore';

export default function UserInfo({ user }) {
    const { state : { auth } } = useContext(Context);

    const friends = auth.user && auth.user.friends.map(friend => friend.id);

    const [addfriend, data] = useMutation(addFriends);
    const handleClick = () => {
        addfriend({
            variables : {friendid: user.id, token : auth.accesstoken},
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
                        !friends.includes(user.id) ?
                        <img className="addfriend mx-3" onClick={handleClick}  src={'/person-plus.svg'} />
                        : <>remove</>
                    }
                    <i className="addfriend bi bi-chat-left"></i>
                </div>
            </div>
        </div>
        <div className="container inf">
            <div className="d-flex flex-column">
                <span>Bio :  </span>
                <h3>user info</h3>
                <span>username : {user.username} </span>
                <span>email : {user.email} </span>
                <span>status : {user.online ? <>online<span className="online"></span></> : <>offline<span className="offline"></span></>  }</span>
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