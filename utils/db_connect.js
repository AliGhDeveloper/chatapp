import mongoose from "mongoose";

export default function db_connect() {
    if(mongoose.connections[0].readyState) return console.log('already connected');

    mongoose.connect(process.env.DB_URL, (error) => {
        if(error) return console.log(error);
        return console.log('connected to db')
    })
}