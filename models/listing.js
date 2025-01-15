const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Creating the lsiting sceham // ddefininig the schema 

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        filename: { type: String , default : "list" },
        url: { type: String , default : "https://unsplash.com/photos/a-couple-of-boats-floating-on-top-of-a-lake-2HaLNVIoyFM"},
        //default valeue and set ternary operator by chance of lacking behind it 
    },
    price: { type: Number, default: 0 }, // Optional with a default value
    location: { type: String, required: true },
    country: { type: String, required: true },
});

//Now putting it into the listing.schema 
const Listing = mongoose.model("Listing" , listingSchema );
module.exports = Listing; // inorder to export the thing into the another zone, you need to use module.exports 
