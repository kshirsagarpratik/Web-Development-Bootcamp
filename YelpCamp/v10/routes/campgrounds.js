var express = require("express"),
    Campground = require("../models/campground"),
    middleware = require("../middleware"),
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
    router.post("/", middleware.isLoggedIn, function(req, res){
    //create new campground from obtained data.
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author};
    Campground.create(newCampground, function(err, newCampground){
         if(err){
             console.log(err);
         }  else{
             res.redirect("/");
         }
    });
});

//NEW ROUTE - form to add a new campground
router.get("/new", middleware.isLoggedIn, function(re, res){
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

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if (err){
           console.log(err);
       } else{
           res.render("campgrounds/edit", { campground: foundCampground });
       }
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, middleware.checkCampgroundOwnership, function(err, updatedCampground){
        console.log("id - " + req.params.id);
        console.log(req.body.campground);
        if(err){
            console.log(err);
            return res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            return res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;