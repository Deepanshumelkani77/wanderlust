const mongoose=require("mongoose");
const Review=require("./review.js")
const {Schema}=mongoose;

const listingSchema= new mongoose.Schema(
    {
        tittle:String,
        description:String,
        image:{
           // type:String,
            //agar user na image ka link nahi diya to hum ak default image laga sakta h.......//agar imag empty ho tabhi hoga
          //  set:(v)=> v===""?"https://plus.unsplash.com/premium_photo-1687960117069-567a456fe5f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D":v,
            //yadi default dalna ho to
          //  default:"https://plus.unsplash.com/premium_photo-1687960117069-567a456fe5f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D"
          url:String,
          filename:String
        },
        price:Number,
        location:String,
        country:String,
        review:[{
            
            type:Schema.Types.ObjectId,
            ref:"Review"
        }],
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    }
)

//middleware for delete reviews

listingSchema.post("findOneAndDelete",async(data)=>{

    if(data)
    {
        await Review.deleteMany({_id:{$in:data.review}});
    }


})
//create model
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;