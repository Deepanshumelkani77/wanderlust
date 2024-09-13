const express=require("express");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const{islogin,isowner,isauthor}=require("../middleware.js");

module.exports.reviewpost=async(req,res)=>{

    let {id}=req.params;
   let list=await Listing.findById(id);
  
  
  
  
   let newreview=new Review(req.body.review);
   newreview.author=req.user._id;
   
   list.review.push(newreview);
  
    await newreview.save();
  await list.save();
  console.log("saveit list)");
  res.redirect(`/listings/${id}`)
  
  }

  module.exports.reviewdelete=async(req,res)=>{
  
    let {id,reviewid}=req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{review:reviewid}});
  // await Review.findByIdAndDelete(reviewid);
  res.redirect(`/listings/${id}`);
  
  }
