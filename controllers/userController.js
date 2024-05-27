const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const nodemailer=require("nodemailer");


// for hashing password
const securePassword=async (password)=>{
  try {
   const passwordHash= await bcrypt.hash(password,10);
   return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
}

// // for send mail
// const sendVerifyMail=async (name,email,_id)=>{
//   try {
//     nodemailer.createTransport({
//       host:'smtp.gmail.com',
//       port:587,
//       secure:false,
//       requireTLS:true,
//       auth:{
//         user:"admin@gmail.com",
//         pass:123
//       }
//     });
//     const mailOptions={
//       from:"admin@gmail.com",
//       to:email,
//       subject:"For verification",
//       html:'<p>Hai '+name+',please click here to <a href="http://127.0.0.1/8000/verify?id='+user_id+'">verify<a/>your mail.</p>'
//     }
//     transporter.sendMail(mailOptions,function(error,info){
//       if (error) {
//         console.log(error);
//       }else{
//         console.log("Email has been sent:- ",info.response);
//       }
//     })
//   } catch (error) {
//     console.log(error.message);
//   }
// }


// To load register
const loadRegister=async(req,res)=>{
    try {
      res.render('registration')  
    } catch (error) {
      console.log(error.message);  
    }
}


// To inset data into database
const insertUser=async(req,res)=>{
    try {
        const sPassword=await securePassword(req.body.password);
        const user=new User({
           name:req.body.name,
           email:req.body.email,
           mobile:req.body.mno,
          //  image:req.file.filename,
           password:sPassword,
           is_admin:0
        });
      const userData=await user.save();

      if(userData){
        // verifyMail(req.body.name,req.body.email,userData._id)
        res.render('login',{message:"Your registration is completed successfully"});
      }else{
        res.redirect('/registration',{message:"Your registration is failed"});
      }
    } catch (error) {
        console.log(error.message); 
    }
}

// // for verify mail
// const verifyMail=async (req,res)=>{
//   try {
//    const updateInfo=await User.updateOne({_id:req.query.id},{$set:{is_verified:1}})
//    console.log(updateInfo);
//    res.render("email-verified")
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// Login user
const loginLoad=async(req,res)=>{
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
      // if (passwordMatch) {
      //  if (userData.isVerified===0) {
      //    res.render('login',{message:"Please verify your mail"})
      //  } else {
         req.session.user_id=userData._id;
        res.redirect('/home')
      //   }
      // } else {
      //   res.render('login',{message:"Email or password is incorrect"}) 
      // }
    } else {
      res.render('login',{message:"Email or password is incorrect"})   
    }   
  } catch (error) {
    console.log(error.message);
  }
}

// Home
const loadHome=async(req,res)=>{
  try {
    const userData=await User.findById({ _id:req.session.user_id})
    res.render('home',{user:userData})
  } catch (error) {
    console.log(error.message);
  }
}

//Logout
const userLogout=async(req,res)=>{
  try {
    req.session.destroy();
    res.redirect('/')
  } catch (error) {
    console.log(error.message);
  }
}

//editProfile
const editProfile=async(req,res)=>{
  try {
    const id=req.query.id;
    const userData=await User.findById({_id:id})
    if (userData) {
      res.render('edit',{user:userData})
    } else {
      res.redirect('/home')
    }
  } catch (error) {
    console.log(error.message);
  }
}

const updateProfile=async(req,res)=>{
  try {
    const userData=await User.findOneAndUpdate({_id:req.body.user_id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mno}})

    res.redirect('/home')
  } catch (error) {
    console.log(error.message);
  }
}

module.exports={
  loadRegister,
    insertUser,
    //verifyMail,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    editProfile,
    updateProfile
}