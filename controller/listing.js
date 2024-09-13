const express=require("express");

const Listing=require("../models/listing.js");
const{islogin,isowner}=require("../middleware.js")







module.exports.index=async(req,res)=>{
    
    let alllist=await Listing.find({});
  
    res.render("./listing/index.ejs",{alllist});
    
  
  };


  module.exports.newget=(req,res)=>{
    
    res.render("./listing/new.ejs");
   
 };

 module.exports.newpost=async(req,res,next)=>{
  
    // try{
    //let result=listingSchema.validate(req.body);  //joi
    //console.log(result);
  let url=req.file.path;
  let filename=req.file.filename;
  //console.log(url);
  

       let {tittle,description,image,price,location,country}=req.body;
       const list= await new Listing({tittle:tittle,description:description,price:price,location:location,country:country})
       list.owner=req.user._id;  //nayi post create hogi usma purana current user hi owner hoga
       list.image={url,filename};
             list.save();
       req.flash("success","New listing created");
       res.redirect("/listings")
   
   // }
    // catch(err){
      // next(err);}
    
   }


   module.exports.show=async(req,res)=>{
    let {id}=req.params;
    const list=await Listing.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner");
    if(!list)
    {
      req.flash("error","listing does not exist");
      res.redirect("/listings");
    }
   console.log(list);
    res.render("./listing/show.ejs",{list});
    
   }


   module.exports.editget=async(req,res)=>{        //islogin middleware h is roter ka andar ka code execute hona sa pahla middleware ka andar ka code execute hoga
    let {id}=req.params;
    const list=await Listing.findById(id);
let imageurl=list.image.url;
imageurl.replace("upload","upload/h_200,w_200");

res.render("./listing/edit.ejs",{list,imageurl})



  };

  module.exports.editput=async(req,res)=>{
   

    let {id}=req.params;
  let {tittle,description,price,location,country}=req.body;
  
 let list= await Listing.findByIdAndUpdate(id,{tittle:tittle,description:description,price:price,location:location,country:country})
if(typeof req.fil!=="undefined") //type of chack krta h kisi variable ki value undefined to ni h
{
 let url=req.file.path;
 let filename=req.file.filename;
 list.image={url,filename};
 await list.save();
}

  req.flash("success"," listing updated");
  res.redirect("/listings");
  };


  module.exports.delete=async(req,res)=>{
  
    let {id}=req.params;
  
  await Listing.findByIdAndDelete(id);
  req.flash("success"," listing Deleted");
  res.redirect("/listings");
  console.log("deleted");
  };