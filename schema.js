//schema validation

const joi=require('joi');

const listingSchema=joi.object({

    listing: joi.object({

        tittle:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().min(0),
        image:joi.string().allow("",null)
    }).required()
})
module.exports=listingSchema;


//sever side validation for review

module.exports.reviewSchema=joi.object({

    review: joi.object({
        rating:joi.number().required(),
        comment:joi.string().required(),

    }).required()
})





