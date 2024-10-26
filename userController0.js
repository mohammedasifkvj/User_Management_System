// const bcrypt = require("bcryptjs");
// const Joi = require("@hapi/joi");
// const _ = require('lodash');
// const axios = require('axios');
// const {validationResult}=require('express-validator')
// const otpGenerator = require('otp-generator');
// const  User  = require("../models/signup");
// const  Otp  = require("../models/otp");
// const  Blacklist  = require("../models/blacklist");
// const mailer=require("../drivers/mailer");
// const {otpExpiry}=require("../drivers/otpValidate")
// const jwt =require('jsonwebtoken');
// const cookieParser=require('cookie-parser')

// //const valid=require("../middlewares/validate")
// // To load home
// //the name in views
// const loadHome = async (req, res) => {
//     try {
//         res.render('1_home');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // To load SignUp
// const loadSignUp = async (req, res) => {
//     try {
//         res.render('2_logind85d');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // To generate OTP
// const sendOtp = async (req, res) => {
//     try {
//        // const email = req.body.email;

//     //    const result=await valid.validateAsync(req.body)
//     const errors=validationResult(req);
//       if(! errors.isEmpty){
//         return res.status(400).send('Errors occured');
//     }
//     const {name,email,mobile,password,token}=req.body;
//        console.log(email)
//        console.log(req.body);
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).send(`${email} is already Exist`);
//         } else {
//           const OTP = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
//             console.log(OTP);

//             // const oldOtp=await Otp.findOne({user_id:user._id})

//             // if(oldOtp){
//             //     const sendNextOTP=await otpExpiry(oldOtp.timestamp)

//             //     if(! sendNextOTP){
//             //         return res.status(400).json({
//             //             success:false,
//             //             msg:"Please try after timer expires"
//             //         })
//             //     }
//             // }

//             const currentDate=new Date();
//        //
//             await Otp.findOneAndUpdate(
//                 //{user_id:user._id},
//                 {otp:OTP,timestamp:new Date(currentDate.getTime())},
//                 {upsert:true, new:true,setDefaultsOnInsert:true}
//             );

//             //const greenWebSMS = new URLSearchParams();

//              const otp = new Otp({ email: email, otp: OTP });
//              const salt = await bcrypt.genSalt(10);
//             otp.otp = await bcrypt.hash(otp.otp,salt);
//             const result = await otp.save();
            
//             // // for send mail
//             // return sendVerifyMail=async (name,email,_id)=>{
//             //     try {
//             //       nodemailer.createTransport({
//             //         host:'smtp.gmail.com',
//             //         port:587,
//             //         secure:false,
//             //         requireTLS:true,
//             //         auth:{
//             //           user:EMAIL_USER,
//             //           pass:EMAIL_PASS
//             //         }
//             //       });
//             //       const mailOptions={
//             //         from:process.env.EMAIL_USER,
//             //         to:email,
//             //         subject:"For verification",
//             //         html:'<p>Hai '+name+',this is your '+OTP+'for verifiction </p>'
//             //       }
//             //       transporter.sendMail(mailOptions,function(error,info){
//             //         if (error) {
//             //           console.log(error);
//             //         }else{
//             //           console.log("Email has been sent:- ",info.response);
//             //           return res.status(200).send('OTP send successfully');
//             //         }
//             //       })
//             //     } catch (error) {
//             //       console.log(error.message);
//             //     }
//             //   }
//             //---------------------------- 
//         const OTPmsg='<p>Hai '+name+', this is the OTP: '+OTP+' for account creation ';

//         mailer.sendMail(email,'Email verification',OTPmsg);
//         res.render('3_otp')

//         console.log('OTP has been send successfully');

//         const userData=new User({
//             name,
//             email,
//             mobile,
//             password:hashPassword,
//             is_admin:false,
//             token:'token'
//          });
//          await userData.save();

//         }
//     } catch (e) {
//         console.log(e);
//     }
// }


// const verifyOtp = async (req, res) => {
//     const { email, otp } = req.body;
  
//     // Find user by email and OTP
//     const user = await User.findOne({ email, otp });
  
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }
  
//     // Check if OTP has expired
//     if (Date.now() > user.otpExpires) {
//       return res.status(400).json({ message: 'OTP expired' });
//     }
  
//     // OTP is valid, finalize user signup
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     await user.save();
  
//     res.status(200).json({ message: 'User successfully registered' });
//   };
  
// // To inset data into database
// const signUp1=async(req,res)=>{
//     try {
//       const errors=validationResult(req);
//       if(! errors.isEmpty){
//         return res.status(400).send('Errors occured');
//     }else{
//       const {name,email,mobile,password,token}=req.body;
//        console.log(email)
//        console.log(req.body);

//    const isExist = await User.findOne({ email});
//         if (isExist) {
//             return res.status(400).send('Email is already exist');
//     }else{

//        const hashPassword=await bcrypt.hash(password,10)
//        const user=new User({
//            name,
//            email,
//            mobile,
//            password:hashPassword,
//            is_Admin:false,
//            token:'token'
//         });

//         // const id=isExist._id.toString()

//         // const token=jwt.sign({_id:id},"JWT_ACCESS_SECRET")

//         // console.log(token);

//       const userData=await user.save();

//       if(userData){
//         // verifyMail(req.body.name,req.body.email,userData._id)
//         res.render('4_login',{message:"Your sign-up is completed successfully,please Sign-in"});
//       }else{
//         res.redirect('/2_logind85d',{message:"Sorry, Your sign-up is failed"});
//       }
//     }
//     }
//     } catch (e) {
//         console.log(e);
//     }
// }

// // // To load OTP
// // const loadOTP = async (req, res) => {
// //     try {
// //         res.redirect('/3_otp');
// //     } catch (error) {
// //         console.log(error.message);
// //     }
// // }

// //send OTP

// // const sendOtp=async (req,res)=>{
// //     try {
        
// //     } catch (error) {
// //         console.log(error.message);
// //     }

// // }
// const verifyOTP1=async (req, res) =>{
//     try {
//         const errors=validationResult(req);
//       if(! errors.isEmpty){
//         return res.status(400).send('Errors occured');
//     }


//     } catch (error) {
//         console.log(error);
//     }
// }


// // To verify OTP
// const verifyOTP = async (req, res) => {
//     try {
//         const otpHolder = await Otp.find({ email: req.body.email });

//         if (otpHolder.length === 0) return res.status(400).send('This OTP is expired');
//         const rightOTPFind = otpHolder[otpHolder.length - 1];
//         const validUser = await bcrypt.compare(req.body.otp, rightOTPFind.otp);

//         if (rightOTPFind.email === req.body.number && validUser) {
//             const user = new User(_.pick(req.body, ["email"]));
//             //const token = generateJWT(); // You need to define this function
//             const result = await user.save();
//             res.render('1_home')
//             const OTPDelete = await Otp.deleteMany({
//                 email: rightOTPFind.email
//             });
           
            
// // //
// //   const hash = await bcrypt.hash(password,12);
// //      const user1 = await User.create(
// //         {
// //             name,
// //             email,
// //             password:hash,
// //             phone
// //         }
// //     )
    

// //     if (user1) {
// //         return res.redirect(
// //           `/login?success=${encodeURIComponent("Successfully your account created.Please login")}`
// //         );
// //     } 
//     return res.status(200).send({
//         message: "User registration successful !",
//        // token: token,
//         data: result

// })

//         } else {
//             return res.status(400).send('Your OTP is wrong !');
//         }

//     } catch (e) {
//         console.log(e);
//     }
// }

// //



// // To load SignIn
// const loadSignIn = async (req, res) => {
//     try {
//         res.render('4_login');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// const generateAccessToken=async (user)=>{
//     const token=jwt.sign(user,process.env.JWT_ACCESS_SECRET,{ expiresIn:"12h"})
//     return token
// }

// const generateRefreshToken=async (user)=>{
//     const token=jwt.sign(user,process.env.JWT_REFRESH_SECRET,{ expiresIn:"24h"})
//     return token
// }
// const signIn=async(req,res)=>{
//     try {
//         const errors=validationResult(req);
//         if(! errors.isEmpty){
//           return res.status(400).send('Errors occured');
//       }else{
//         const {email,password}=req.body;
//         const userData=await User.findOne({email})
//         if(!userData){
//             return res.render("4_login", {
//                 error: "User not found",
//                 success: null,
//               });
//         }
//         const isMatch = await bcrypt.compare(password, userData.password);

//         if (!isMatch)
//             return res.render('4_login', {
//               error: "Email or password is incorrect",
//               success: null,
//             });

//           const accessToken=  await generateAccessToken({user:userData});

//           const refreshToken=  await generateRefreshToken({user:userData});

//           return res.redirect('/1_home', {
//             msg: "Login successfully",
//             success: true,
//             user:userData,
//             accessToken:accessToken,
//             refreshToken:refreshToken,
//             tokenType:'Bearer'
//           });
//       }
         
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// const refreshToken=async(req,res)=>{
//     try {

//         const userId=req.user.userId;
//         const userData=await User.findOne({_id:userId})

//         const accessToken=  await generateAccessToken({user:userData});

//           const refreshToken=  await generateRefreshToken({user:userData});

//           return res.status(200).redirect('/1_home')
        
//     } catch (error) {
//         console.log(error.message); 
//     }
// }
// // To load forgot password 
// const forgetPW = async (req, res) => {
//     try {
//         res.render('5_forgetPW');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // To load New Release Page
// const newRel = async (req, res) => {
//     try {
//         res.render('7_newRelease');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // To load Mens Page
// const mensPage = async (req, res) => {
//     try {
//         res.render('8_mens');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // To load Womens Page
// const womensPage = async (req, res) => {
//     try {
//         res.render('9_womens');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // To load Cart
// const loadCart = async (req, res) => {
//     try {
//         res.render('10_cart');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // To load Product Page
// const product = async (req, res) => {
//     try {
//         res.render('11_product');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // To load Brands Page
// const brands = async (req, res) => {
//     try {
//         res.render('brands');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // To load Return and Shipping Page
// const retAndShip = async (req, res) => {
//     try {
//         res.render('return_ship');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // To load Contact Us Page
// const contactUs = async (req, res) => {
//     try {
//         res.render('contact_us');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // Lpg-Out
// const logout=async(req,res)=>{
//     try {
//         const token=req.body.token|| req.query.token || req.headers["authorization'"];

//         const bearer=token.split(' ')
//         const bearerToken=bearer[1]

//         const newBlacklist=new Blacklist({
//             token:bearerToken
//         })

//         await newBlacklist.save()
//         res.setHeader('Clear-Site-Data','"cookies","storage"')
//         return res.redirect('/1_home')

//     } catch (error) {
//       console.log(error.message);
//     }
//   }
// module.exports = {
//     loadHome,
//     loadSignUp,
//     //loadOTP,
//     sendOtp,
//     //signUp,
//     verifyOTP,
//     verifyOtp,
//     loadSignIn,
//     signIn,
//     forgetPW,
//     newRel,
//     mensPage,
//     womensPage,
//     loadCart,
//     product,
//     retAndShip,
//     contactUs,
//     brands,
//     logout
// }