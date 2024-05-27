
const express=require("express");
const app=express();
const path=require("path");

 // Load static assets
app.use(express.static('public'));
app.use('/static',express.static(path.join(__dirname,'public')))

// for user routes
const userRoute=require('./routes/userRoute');
app.use('/',userRoute);


// // for admin routes
const adminRoute=require('./routes/adminRoute');
app.use('/admin',adminRoute);

const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Project");

const port=process.env.PORT ||8000;
app.listen(port,function () {
   console.log("Listening to the server on http://127.0.0.1:8000/"); 
});