const express = require("express");
const app = express();
const port = 8888;
let methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
let Listing = require("./models/listing.js");
const path = require("path");
app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(methodOverride("_method"));

app.use(express.urlencoded ({extended : true}));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname, "public")));

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
//Getting the sample list 
app.get("/testListing" , async (req , res) => {
  let sampleListing = new Listing({
    title : "The villa palace",
    description : "beside the beach",
    price : 1500,
    location : "Sullurpeta",
    country : "India",
  })

  await sampleListing.save();
  console.log(sampleListing);
  res.send("Send Successfully");
});

app.get("/listings" , async (req, res) => {
  let allListings = await Listing.find({});
  // console.log(allListings);
  res.render("./listings/index.ejs" , {allListings});
});

//Adding a new list

app.get("/listings/new" , async (req , res) => {
  res.render("./listings/new.ejs")
});


app.post("/listings" ,  async (req , res) => {
  const { title, description, image , price, location, country } = req.body;
  const newListing = new Listing({
    title: title,
    description: description,
    image : image.url,
    price: price,
    location: location,
    country: country,
});
// Save to the database
await newListing.save();
// Redirect after saving
res.redirect("/listings");
 //It is not able to 
});

//Show route 
app.get("/listings/:id" , async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("./listings/show.ejs" , { listing });
});

//edit route
app.get("/listings/:id/edit" , async ( req , res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("./listings/edit.ejs" , { listing });
});


app.put("/listings/:id" , async (req , res) => {
  let { id } = req.params;
  let {title : newTitle , description : newDescription , image: newImage , price : newPrice, location : newLocation , country : newCountry} = req.body;
  let updatedList =  await Listing.findByIdAndUpdate(id , 
    {title: newTitle, 
    description: newDescription, 
    image: newImage.url,
    price: newPrice, 
    location: newLocation, 
    country: newCountry }, {runValidators : true , new : true} );
  console.log( updatedList); 
  res.redirect("/listings");
});

//destroy the things
app.delete("/listings/:id" , async (req , res) => {
  let { id } = req.params;
  let deletedList = await Listing.findByIdAndDelete(id);
  console.log(deletedList);
  res.redirect("/listings");
});

app.get("/" , (req , res) => {
    res.send("Successfully data transfer");
});


app.listen(port , () => {
    console.log(`The port is listening at ${port}`)
});


 // let { title , description , image , price , location , country} = req.body;
  // let newList = await new Listing({
  //    title : title,
  //    description : description,
  //    image : image,
  //    price : price,
  //    location : location,
  //    country : country,
  // }); //
