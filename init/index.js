const mongoose = require("mongoose");
const initData = require("../init/data.js");


const Listing = require("../models/listing.js");


main()
    .then(() => {
    console.log("The DB was connected successfully");
    return initDB();
})
    .catch(err => console.log(err));
    async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    };


const initDB = async () => {
    //okay, now initializzing the database 
    await Listing.deleteMany({}); //first we deleted the entire sample listing that we don't want 
    //now adding all the data from the data.js
    await Listing.insertMany(initData.data);
    console.log("Data is initialized");
}// As this is a function, you need to call this function as well


