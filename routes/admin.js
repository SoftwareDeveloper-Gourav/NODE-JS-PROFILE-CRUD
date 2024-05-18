const express = require('express');
const adminRoute = express.Router();
const adminDashboardRoute = express.Router();
const {adminLoginPage,adminLogin,adminDashboard,addUserPage,viewUserPage,addUser,deleteUser,editPage,updateUser,logout} = require('../controllers/admin');

adminRoute.get('/',adminLoginPage);
adminRoute.post('/admin-login',adminLogin);
adminRoute.get('/dashboard',adminDashboard);

// DASHBOARD ROUTE 

adminDashboardRoute.get('/add-user',addUserPage);
adminDashboardRoute.get('/view-user',viewUserPage);
adminDashboardRoute.post('/add-user',addUser);
adminDashboardRoute.get('/delete/:id',deleteUser);
adminDashboardRoute.get('/edit/:id',editPage);
adminDashboardRoute.post('/edit/:id',updateUser);
adminDashboardRoute.get('/logout',logout);




module.exports = {adminRoute,adminDashboardRoute};