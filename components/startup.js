import socketConnection from "utils/socketConnection";
import { useState, useEffect, useContext } from "react";
import Loading from "./layout/loading";
import { Context } from "store/globalstore";
import { useQuery } from "@apollo/client";
import { refresh } from "utils/queries";
import { useRouter } from "next/router";

export default function StartUp({ children }) {
    const router = useRouter();
    const { state: { auth }, dispatch } = useContext(Context);
    const [loading, setLoading] = useState(true)
    const refreshAuth = useQuery(refresh);
    const [error, setError] = useState({})

    
    
    useEffect(() => {
        if(!refreshAuth.loading) {
            dispatch({ type: 'AUTH', payload: refreshAuth.data ?  {loading: false, ...refreshAuth.data.refresh} : {loading: false}})
        }
    }, [refreshAuth])

    useEffect(() => {
        if(!auth.loading && !auth.accesstoken && !auth.user) {
            router.push('/login')
        }
    }, [auth])

    useEffect(() => {
        if(!refreshAuth.loading){
            // socketConnection(setError, setLoading, auth.accesstoken);
        }
    }, [auth])
    
    if(loading || refreshAuth.loading) return <Loading />
    // if(!refreshAuth.loading && error.message && !loading  ) 

    return (
        <>
            {children} 
        </>
    )
    
}