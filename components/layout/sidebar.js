import Link from "next/link";
import { useContext } from 'react';
import { Context } from "store/globalstore";
import Cookie from "js-cookie";
export default function Sidebar({open}) {
    const { dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: 'AUTH', payload: {} });
        Cookie.remove('refreshtoken')
    }

    return (
        <div className={`sidebar ${open ? 'show' : ''}`}>
            <ul>
                <Link href="/profile"><li>Profile</li></Link>
                <Link href="/"><li>Chats</li></Link>
                <Link href="/about"><li>About</li></Link>
                <Link href="#"><li>Settings</li></Link>
                <Link href="/user/friends"><li>Friends</li></Link>
                <li><button onClick={handleLogout} style={{border: "none", backgroundColor: "white"}}>Logout</button></li>
            </ul>
        </div>
    )
}