var express = require("express"),
 bodyParser = require('body-parser'),
 mongoose   = require("mongoose"),
 Campground = require("./models/campground"),
 Comment    = require("./models/comment"),
 seedDB     = require("./seed"),
        app = express();
        

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//connect db
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

seedDB();

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
            res.render("campgrounds/index", {campgrounds: campgrounds});
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
    res.render("campgrounds/new");
});

//SHOW ROUTE
app.get("/campgrounds/:id", function(req, res) {
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

//>>>>>>>>>>>COMMENT ROUTES>>>>>>>>>>>>>>//

app.get("/campgrounds/:id/comments/new", function(req, res) {
    //find the campground and then render the form
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log("found it!");
            res.render("comments/new", {campground: foundCampground});
            console.log(foundCampground);
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    //find the campground, add comment, add comment to cg and save.
    console.log("Yo Im hit!");
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err){
            console.log(err);
        } else{
            console.log("Im here!");
            Comment.create(req.body.comment, function(err, createdComment){
                if(err){
                    console.log(err);
                } else{
                    console.log(createdComment);
                    console.log("Im here too!");
                    foundCampground.comments.push(createdComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server is up and running!");
});