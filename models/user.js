const { required } = require("joi");
const mongoose=require("mongoose");

const {Schema}=mongoose;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    username:String //hum username nahi bhi likha to chalaga kyuki passport khud add kar data h username ko.

});
userSchema.plugin(passportLocalMongoose);//model define krna sa pahla ya vali line likh lana

const User=mongoose.model("User",userSchema);
module.exports=User;
