const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User