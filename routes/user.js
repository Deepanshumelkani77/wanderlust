const express=require("express");
const router=express.Router();//router object
const User=require("../models/user.js");
const passport=require("passport");
const { saveredirecturl } = require("../middleware.js");
const usercontroller=require("../controller/user.js");
//const{islogin,isowner}=require("../middleware.js")

//signup

router.get("/",usercontroller.signget);


router.post("/",usercontroller.signpost);


//login

router.get("/login",usercontroller.loginget);


router.post("/login",saveredirecturl,passport.authenticate( "local",{failureRedirect:'/signup/login',failureFlash:true}),usercontroller.loginpost);


//logout

router.get("/logout",usercontroller.logout);



module.exports=router;



