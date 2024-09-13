//require express
const express=require("express");
const app=express();
const port=7070;
app.listen(port,()=>{
    console.log("server is listening:",port);
})





//require mongoose
const mongoose=require("mongoose");

main().then(()=>{
    console.log("connected to database");
})
.catch(err => console.log(err));

async function main() {
 ///await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

//Gipl6gjBkDiS3clQ

await mongoose.connect("mongodb+srv://user77:Atlas77@cluster000.zko48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster000");
//mongoose.connect('mongodb+srv://deepumelkani123:aibZVUjZFdZXTmPZ@cluster0.mongodb.net/<database>?retryWrites=true&w=majority');
//await mongoose.connect("mongodb://deepumelkani123:aibZVUjZFdZXTmPZ@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin") 

}
//require model(collection)
const Listing=require("./models/listing.js");
const Review=require("./models/review.js");



//env
if(process.env.NODE_ENV!="production") //jab hamara project production phase m nahi h tab .env ko use krna h .....
{
  require('dotenv').config();
}





//set all things


const path=require("path");
const { constants } = require("fs/promises");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
const ejsMate=require("ejs-mate");
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
//const {listingSchema,reviewSchema}=require("./schema.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
const users=require("./routes/user.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');//session storage during production



// Create the session store
const store = MongoStore.create({
  mongoUrl: "mongodb+srv://user77:Atlas77@cluster000.zko48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster000",
  crypto: {
    secret:process.env.SECRET
  },
  touchAfter: 24 * 3600 // Time in seconds after which the session store will update (once every 24 hours)
});




const flash=require("connect-flash");
app.use(flash());//flash ko routres sa pahla use krnaa hoga
const {Schema}=mongoose;
app.use(session({store:store, secret:process.env.SECRET,resave:false,saveUninitialized:true,cookie:{
  expires:Date.now()+7*24*60*60*1000,
  maxAge:7*24*60*60*1000,
  httpOnly:true
}}));



const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

if(process.env.NODE_ENV!="production") //jab hamara project production phase m nahi h tab .env ko use krna h .....
{
  require('dotenv').config();
}


//insert data in User fake
//app.get("/demouser",async(req,res)=>{

  //let fakeuser=new User({
    //email:"dev123@gmail.com",
    //username:"Dev77"
  //})

  //save krna ka badla register karinga 
  //let registeruser=await User.register(fakeuser,"Hack77");
  //res.send(registeruser);})





//message
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currentuser=req.user;
  next();
})



//basic api=api tabhi run hoga jab hum (localhost:7070/) ko run karinga matlb database m bhi value tabhi insert hogi jab ya run hoga

//middleware for error handler=if new listing create krta samay kisi na price m number ki jagah string dal di to
//app.use((err,res,req,next)=>{
  //res.render("./listing/error.ejs");})


//rotes
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/signup",users);


