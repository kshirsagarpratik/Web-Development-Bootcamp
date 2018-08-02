var express = require("express"),
    Campground = require("../models/campground"),
    router  = express.Router();

// INDEX ROUTE - show all campgrounds
router.get("/", function(req, res) {
    //get all camgrounds from db
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
    
});


//CREATE ROUTE - add a new campground from form
    router.post("/", function(req, res){
    //create new campground from obtained data.
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, newCampground){
         if(err){
             console.log(err);
         }  else{
             res.redirect("/");
         }
    });
});

//NEW ROUTE - form to add a new campground
router.get("/new", function(re, res){
    //render form page.
    res.render("campgrounds/new");
});

//SHOW ROUTE - show a particular campground in detail
router.get("/:id", function(req, res) {
//   res.send("This will be the show page one day!"); 
//find the campground with provided id
//render show template of that campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }   else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

module.exports = router;