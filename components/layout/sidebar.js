import Link from "next/link";

export default function Sidebar({open}) {
    return (
        <div className={`sidebar ${open ? 'show' : ''}`}>
            <ul>
                <Link href="#"><li>Chats</li></Link>
                <Link href="#"><li>About</li></Link>
                <Link href="#"><li>Settings</li></Link>
                <Link href="#"><li>Friends</li></Link>
            </ul>
        </div>
    )
}