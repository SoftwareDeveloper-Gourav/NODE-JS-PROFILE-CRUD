const express = require('express');
const app = express();
const conn = require('./config/conn');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const {adminLogCheck,getAdminDetails} = require('./middlewares/adminMiddleware');
// ROUTES 
const {adminRoute,adminDashboardRoute} = require('./routes/admin');
conn();
const PORT = 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use(cookieParser());

// VIEWS 
app.use('/',adminRoute);

app.use('/dashboard',adminLogCheck,adminDashboardRoute);


app.listen(PORT,()=>{console.log(`server run to PORT: ${PORT}`)});