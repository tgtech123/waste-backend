const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    phone:[String],
    dob:String,
    password: String ,
    email:{
        type: String,
        required:true,
        unique: true
    }

},

{
    timestamps:true
}
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;