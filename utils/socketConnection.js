import { io } from "socket.io-client";
import { useRouter } from "next/router";
let socket;


export default async function socketConnection(setError) {
    await fetch('/api/socket');
    socket = io({
        auth : {
            token: "slama"
        }
    });

    

    socket.on("connect_error", (error) => setError(error))

    socket.on('connect',() => console.log('socket connected'))
}