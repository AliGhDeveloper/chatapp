import mongoose from "mongoose";


const schema = new mongoose.Schema({
    members : {
        type: Array,
        required : true
    },
    avatar : {
        type: String,
        required : true,
        default : "data:image/png;base64,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"
    },
    name : {
        type: String,
        required : true,
        defalut : 'New Group'
    },
    messages : [
        {
            senderid : { type: String, required: true},
            sender : {type: String, required: true},
            time : {type: Date, required: true},
            content : {type: String, required: true},
        }
    ]
}, {
    timestamps: true
});


const dataset = mongoose.models.Rooms || mongoose.model('Rooms', schema);

export default dataset