const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const reviewSchema=new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    created:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

//when we delete listing then all review also delete using middleware but condition findbyidanddelete query present only one time in index.js

const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;