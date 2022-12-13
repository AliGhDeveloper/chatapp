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
    const refreshAuth = useQuery(refresh);
    
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
    
    if(refreshAuth.loading) return <Loading />

    return (
        <>
            {children} 
        </>
    )
    
}