const User=require("../models/userModel");
const bcrypt=require("bcrypt");

// for hashing password
// const securePassword=async (password)=>{
//     try {
//      const passwordHash= await bcrypt.hash(password,10);
//      return passwordHash;
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

  // Admin Login
  
  const loadLogin=async(req,res)=>{
    try {
      res.render('login')
    } catch (error) {
      console.log(error.message);
    }
  }

  // verify login
const verifyLogin=async(req,res)=>{
  try {
    const email=req.body.email;
    const password=req.body.password
    const userData=await User.findOne({email:email})
    if (userData) {
      const passwordMatch=await bcrypt.compare(password,userData.password);
      if (passwordMatch) {
       if (userData.isAdmin==false) {
        res.render('login',{message:"Email or password is incorrect"})
       } else {
         req.session.user_id=userData._id;
         res.redirect('/admin/dashboard')
        }
      } else {
        res.render('login',{message:"Email or password is incorrect"}) 
      }
    } else {
      res.render('login',{message:"Email or password is incorrect"})   
    }
    
  } catch (error) {
    console.log(error.message);
  }
}

//load Dashboard
const loadDash=async(req,res)=>{
  try {
    res.render('dashboard')
  } catch (error) {
    console.log(error.message);
  }
}

  module.exports={
    loadLogin,
    verifyLogin,
    loadDash
    //   insertUser,
    //   //verifyMail,
    //   loginLoad,
    //   loadHome,
    //   userLogout,
    //   editProfile,
    //   updateProfile
  }