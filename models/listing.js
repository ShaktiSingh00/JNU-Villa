const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        type : String,
        default : "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
        set : (v) => 
            v==="" ? "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" 
            : v,
    },
    price : Number,

    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await review.deleteMany({ _id : { $in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;