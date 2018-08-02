var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

//  NEW ROUTE - form for creating a new comment
router.get("/new", isLoggedIn, function(req, res) {
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

// CREATE ROUTE - saving new comment into database from form
router.post("/", isLoggedIn, function(req, res){
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

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;