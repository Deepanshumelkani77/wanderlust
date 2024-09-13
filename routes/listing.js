const express=require("express");
const router=express.Router();//router object
const Listing=require("../models/listing.js");
const{islogin,isowner}=require("../middleware.js")
const listingcontroller=require("../controller/listing.js");

//for upload file multer package
const multer  = require('multer')
const {cloudinary,storage}=require("../cloudConfig.js");
//const upload = multer({ dest: 'uploads/' })  //multer form sa file ko lakar upload vala folder m store kar daga ya folder vo khud create kar daga.
const upload=multer({storage});//pahla file upload m store ho rahi thi lakim ab cloudinary ka storage m store hogi..




router.
route("/")
.get(listingcontroller.index)
.post(upload.single('image'),listingcontroller.newpost);



//router.get("/",listingcontroller.index) ;
  
  
  //create new
  router.get("/new",islogin,listingcontroller.newget);
// router.post("/",listingcontroller.newpost); //create new listing
  
  
  
  //show route=show individual list
  router.get("/:id",listingcontroller.show);  
  
 
   
//edit route,or update individual listing=/listings/:id/new
router.get("/:id/edit",islogin,isowner,listingcontroller.editget);

//update route
router.put("/:id",upload.single('image'),isowner,listingcontroller.editput);
 

 //delete route
 router.delete("/:id",islogin,isowner,listingcontroller.delete);

module.exports=router;