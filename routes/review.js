const express=require("express");
const router=express.Router({mergeParams:true});//router object
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const{islogin,isowner,isauthor}=require("../middleware.js")
const reviewcontroller=require("../controller/review.js");
//remove common part from route


//review
router.post("/",islogin,reviewcontroller.reviewpost);
  
  
  //delete review route
  router.delete("/:reviewid",islogin,isauthor,reviewcontroller.reviewdelete);
  


  module.exports=router;