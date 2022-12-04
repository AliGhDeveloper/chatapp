import Sidebar from 'components/layout/sidebar'
import { useState, useContext } from 'react';
import { Context } from 'store/globalstore';
import { useRouter } from 'next/router';


export default function Navbar() {
    const router = useRouter();
    
    const { state : {auth}} = useContext(Context);


    const [open, setOpen] = useState(false);

    if(router.route === '/login' || router.route === '/register') return null

    

    return (
        <nav className="navbar bg-light" >
            <Sidebar open={open} />
            <div className="container-fluid navs" >
                <a className="navbar-brand">Navbar</a>
                <div className="navitems d-flex align-items-center">
                    <form className="d-flex" role="search">
                        <input className="form-control form-control-sm me-2 search" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-sm btn-outline-success" type="submit">Search</button>
                    </form>
                    
                    <i className="mx-2 p-1 my-0 bi menu bi-three-dots-vertical" onClick={() => setOpen(!open)}></i>
                </div>
            </div>
        </nav>
    )
}