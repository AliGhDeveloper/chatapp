import socketConnection from "utils/socketConnection";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Login from '../pages/login'
import Loading from "./layout/loading";

export default function StartUp({ children }) {
    const router = useRouter();
    const [error, setError] = useState({  })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if( error.message && error.data) {
            console.log(error.message);
            console.log(`note :${error.data.content}`);
        }
        setLoading(false)
    }, [error])

    useEffect(() => {
        socketConnection(setError);
    }, [])
    
    if(loading) return <Loading />

    if(!loading && error.message) return <Login />

    else {
        return (
            <>
               {children} 
            </>
        )
    }
}