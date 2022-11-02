import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    username : {
        type : String,
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
    socketid :  {
        type : String,
        required: true
    }
}, {
    timestamps : true
});

const dataset = mongoose.models.Users || mongoose.model('Users', schema);

export default dataset