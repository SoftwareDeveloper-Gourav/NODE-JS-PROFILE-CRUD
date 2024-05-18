const mongoose = require('mongoose');
const conn = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/crud').then(()=>{console.log('DB CONNECT')});
}

module.exports = conn;