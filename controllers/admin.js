const { default: mongoose } = require("mongoose");
const admin = require("../models/admin");
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');


const adminLoginPage = (req, res) => {
    console.log(admin);
  const error = req.query.error;
  res.render("login", { msg: error });
};

// adminLogin
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/?error=please fill all fields");
  } else {
    const emailisTrue = await admin.findOne({ email: email });
    
    if (emailisTrue) {
        const checkEmailPassword = await admin.findOne({
        email: email,
        password:password,
      });

      if (checkEmailPassword) {
        const token = jwt.sign({name:checkEmailPassword.name,id:checkEmailPassword._id},"gourav2024$");

        res.cookie('admin',token);

        res.redirect("/dashboard");
      } else {
        res.redirect("/?error=Please check your password");
      }
    } else {
      res.redirect("/?error=Please check your email address");
    }
  }
};

const getAdmin =(req,res)=>{

  try{
    const adminDetails = req.cookies.admin;
    return jwt.verify(adminDetails,"gourav2024$");
  }catch{
   res.redirect('/');
  }
  
}

// adminDashboard


const adminDashboard =(req,res)=>{
      const admin = getAdmin(req,res);
     res.render('dashboard/index',{admin:admin});
}

// addUserPage 
const addUserPage =(req,res)=>{
  const msg = "";
  const icon = "";
  const admin = getAdmin(req,res);

  res.render('dashboard/addUser',{msg:msg,icon:icon,admin:admin});
}
// viewUserPage
const viewUserPage = async (req,res) =>{
  const userData = await userModel.find({});
  const admin = getAdmin(req,res);
  res.render('dashboard/viewUser',{data:userData,admin:admin});

}

// ADD USER 
const addUser = async(req,res)=>{
  const admin = getAdmin(req,res);
 const {name,email,number,dob,gander} = req.body;
 if(!name || !email || !number || !dob || !gander){
  res.render('dashboard/addUser',{msg:"Please fill all the fields and than submit the form",icon:"danger",admin:admin});
 }else{
if(number.length<10 || number.length>12){
  res.render('dashboard/addUser',{msg:"Please enter correct phone number",icon:"danger",admin:admin});
}

const checkEmail = await userModel.findOne({email:email});
const checkNumber = await userModel.findOne({phone_number:number});
console.log(checkEmail)

if(checkEmail){
  res.render('dashboard/addUser',{msg:"This email is already registered !",icon:"danger",admin:admin});
}
if(checkNumber){
  res.render('dashboard/addUser',{msg:"This number is already registered !",icon:"danger",admin:admin});
}
const admin = getAdmin(req,res);
    const saveUser = await userModel.create({

      name:name,
      email:email,
      phone_number:number,
      dob:dob,
      gander:gander,
    });
  if(saveUser){
    res.render('dashboard/addUser',{msg:"User Submited Successfull",icon:"success",admin:admin});
  }
 }

}

// deleteUser
const deleteUser= async(req,res)=>{
  const admin = getAdmin(req,res);

  const userId = req.params.id;
  const checkUserValid =await userModel.findById(userId);
  if(checkUserValid){
   const deleteUser =  await userModel.findByIdAndDelete(userId);
   res.redirect('/dashboard/view-user',);  
  }else{
    res.render('dashboard/viewUser',{admin:admin});
  }
}

// editPage
const editPage = async (req,res)=>{   
  const admin = getAdmin(req,res);
   const id = req.params.id;
   const userDetails = await userModel.findById(id);
     res.render('dashboard/editUser',{user:userDetails,admin:admin});
}

const updateUser = async(req,res)=>{
  const admin = getAdmin(req,res);

  const {name,email,password,dob,number,gander} = req.body;
  const id = req.params.id;

  const update = await userModel.findByIdAndUpdate(id,{name:name,email:email,phone_number:number,password:password,dob:dob,gander:gander});
  res.redirect('/dashboard/view-user');
  
}

// logout 
const logout = (req,res) =>{
    res.cookie('admin','');
    res.redirect('/');
}


module.exports = { adminLoginPage, adminLogin ,adminDashboard,addUserPage,viewUserPage,addUser,deleteUser,editPage,updateUser,logout};
