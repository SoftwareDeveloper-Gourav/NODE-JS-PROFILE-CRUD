const jwt = require("jsonwebtoken");

const adminLogCheck=(req,res,next)=>{
 if(req.cookies.admin){
    next();
 }else{
    res.redirect('/');
 }
}


module.exports = {adminLogCheck};