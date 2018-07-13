var express = require("express"),
 bodyParser = require('body-parser'),
 mongoose   = require("mongoose"),
        app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//connect db
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

//create a schema for campgrounds
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

//create a model from the schema
var Campground = mongoose.model("Campground", campgroundSchema);

//create dummy campgrounds to store in db
// Campground.create({
//     name: "Camp Shelly", 
//     image:"https://www.campsitephotos.com/photo/camp/41089/Camp_Shelly_018.jpg",
//     description: "Beautiful woods, no bathrooms, no water."}
//     , function(err, campground){
//       if(err){
//           console.log(err);
//       } else{
//           console.log("We created a cg in the db");
//           console.log(campground);
//       }
// });

app.get("/", function(req, res) {
    res.render("landing");   
});

// INDEX ROUTE
app.get("/campgrounds", function(req, res) {
    //get all camgrounds from db
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds: campgrounds});
        }
    });
    
});


//CREATE ROUTE
    app.post("/campgrounds", function(req, res){
    //create new campground from obtained data.
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, newCampground){
         if(err){
             console.log(err);
         }  else{
             res.redirect("/campgrounds");
         }
    });
});

//NEW ROUTE
app.get("/campgrounds/new", function(re, res){
    //render form page.
    res.render("new");
});

//SHOW ROUTE
app.get("/campgrounds/:id", function(req, res) {
//   res.send("This will be the show page one day!"); 
//find the campground with provided id
//render show template of that campground
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }   else{
            res.render("show", {campground:foundCampground});
        }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server is up and running!");
});