const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    location:{
        type: String,
        required: true,
        unique: true

    },
    date:{
        type: Date,
        required:true,
        default: Date.now()
    }

},

{
    timestamps:true
}
);

const locationModel = mongoose.model("location", locationSchema);

module.exports = locationModel;
