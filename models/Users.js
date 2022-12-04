import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    avatar : {
        type : String,
        required : true,
        default : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    },
    username : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password :  {
        type : String,
        required: true
    },
    online :  {
        type : Boolean,
        required: true,
        default : false
    },
    rooms :  {
        type : Array,
        required: true,
        default : []
    },
    friends : {
        type : Array,
        required : true,
        default : []
    },
    socketid :  {
        type : String,
        required: true
    }
}, {
    timestamps : true
});

const dataset = mongoose.models.Users3 || mongoose.model('Users3', schema);

export default dataset