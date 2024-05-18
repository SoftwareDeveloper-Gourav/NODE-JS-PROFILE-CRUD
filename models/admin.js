const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },

},{timestamps:true});

const admin = mongoose.model('admins',adminSchema);
module.exports = admin;