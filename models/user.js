const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
phone_number:{
    type:Number,
    required:true
},
dob:{
    type:Date,
    required:true
},  
gander:{
    type:String,
    required:true
},  
},{timestamps:true});

const userModel = mongoose.model('users',userSchema);
module.exports = userModel;