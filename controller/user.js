const express=require("express");
const User=require("../models/user.js");
const passport=require("passport");
const { saveredirecturl } = require("../middleware.js");

module.exports.signget=(req,res)=>{
    res.render("./user/signup.ejs");
};

module.exports.signpost=async(req,res,next)=>{
    try{
        let {email,username,password}=req.body;
        let user1=new User({email,username});
    let registeruser=await User.register(user1,password);
    console.log(registeruser);




//after signup automatically login
req.login(registeruser,(err)=>{

if(err)
{
    return next(err);
}
req.flash("success","User was register");
return res.redirect("/listings");
});
 }

    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    

}


module.exports.loginget=(req,res)=>{

    res.render("user/login.ejs");
}

module.exports.loginpost=(req,res)=>{

    if(res.locals.redirecturl)
    {
    res.redirect(res.locals.redirecturl);}

    else{res.redirect("/listings");}
}



  module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        
        // Clear session cookies
        res.clearCookie('connect.sid'); // Assuming 'connect.sid' is the name of your session cookie

        // Send a response to trigger client-side cleanup
        res.redirect('/listings');
    });
};
