import { useContext } from "react";
import { Context } from 'store/globalstore';


export default function Profile() {
    const { state : { auth } } = useContext(Context);
    
    return (
        <div className="userinfo" >
         <div className="poster bg-light w-100" >
             <div className="container d-flex justify-content-between align-items-center">
                 <img className="avatar" src={auth.user?.avatar}/>
                 
             </div>
         </div>
         <div className="container inf">
             <div className="d-flex flex-column">
                 <span>Bio :  </span>
                 <h3>user info</h3>
                 <span>username : {auth.user?.username} </span>
                 <span>email : {auth.user?.email} </span>
             </div>
         </div>
        </div> 
     )
}