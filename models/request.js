const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    phone:[String],
    email:{
        type: String,
        required:true,
    },
    address:{
        type: String,
        required: true
    },
    address2:String,
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }

},

{
    timestamps:true
}
);

const requestModel = mongoose.model("request", requestSchema);

module.exports = requestModel;
