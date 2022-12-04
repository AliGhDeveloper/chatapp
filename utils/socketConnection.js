import { io } from "socket.io-client";
export let socket;


export default async function socketConnection(setError, setLoading, token = null, dispatch, auth) {
    await fetch(process.env.BASE_URL + '/api/socket');
   
    socket = io({
        auth : {
            token 
        }
    });

    socket.on("connect_error", (error) => {
        setError(error)
        setLoading(false)
    })

    socket.on('connect',() => {
        setError({});
        setLoading(false)
        console.log('socket connected');
        // dispatch({ type: 'AUTH', payload: {...auth, user: {...auth.user, socketid}}})
    });

    
}