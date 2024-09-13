const Listing=require("./models/listing");
const Review=require("./models/review");

module.exports.islogin=(req,res,next)=>{

  console.log(req.path,"..",req.originalUrl);
    if(!req.isAuthenticated())
        {
          console.log("original url: ", req.originalUrl)
          //redirect url save
       req.session.redirecturl=req.originalUrl;  //this is for post-login 

   req.flash("error","you are not login");
  return res.redirect("/signup/login");        //return likhna jaruri h
        }
        next();
}


module.exports.saveredirecturl=(req,res,next)=>{
  if(req.session.redirecturl)
  {
    res.locals.redirecturl=req.session.redirecturl
    
  }next();
}



//middleware for set autharization for listing delete or edit button
module.exports.isowner=async(req,res,next)=>{
  let {id}=req.params;
  
  let listing=await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currentuser._id))
  {
    req.flash("error","you are not owner of this listing");
   return res.redirect(`/listings/${id}`);//agar return nahi kra to edit bhi ho jayaga
  }next();
}

//middleware for delete review

module.exports.isauthor=async(req,res,next)=>{
  let {id,reviewid}=req.params;
  
  let review=await Review.findById(reviewid);
  if(!review.author.equals(res.locals.currentuser._id))
  {
    req.flash("error","you did not create this review");
   return res.redirect(`/listings/${id}`);//agar return nahi kra to edit bhi ho jayaga
  }next();
}
