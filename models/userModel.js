const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const User = new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    
     }
     ,
    isAdmin:{
        type:Boolean,
        default: false
    }
     //,
    // image:{
    //     type:String,
    //     required:true
    // }
    // ,
    // isVerified:{
    //     type:Number,
    //    default:0
    // }
});

module.exports=mongoose.model('User',User)

