//for use cloud storage

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

if(process.env.NODE_ENV!="production") //jab hamara project production phase m nahi h tab .env ko use krna h .....
{
  require('dotenv').config();
}


cloudinary.config({

    
    cloud_name:process.env.CLOUD_NAME,  //env m variable ko kuch bhi name da sakta h lakin yaha pahla sa hi set hota h ...
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,


});




//define storage(folder)
//iska matlv h cloudinary m ak folder banaga jaha hum information store kar payinga...
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowerdFormats: async (req, file) => ["png","jpg","jpeg"], // supports promises as well
     
    },
  });

  module.exports={
    cloudinary,
storage
  }