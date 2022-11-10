const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        min: 8,
        max: 15,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema)