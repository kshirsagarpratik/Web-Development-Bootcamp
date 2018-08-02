var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    middleware = require("../middleware"),
    Comment = require("../models/comment");

//  NEW ROUTE - form for creating a new comment
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/", middleware.isLoggedIn, function(req, res){
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
                    console.log("Im here too!");
                    //add author id and username to comment
                    createdComment.author.id = req.user._id;
                    createdComment.author.username = req.user.username;
                    console.log(createdComment);
                    //save comment
                    createdComment.save();
                    foundCampground.comments.push(createdComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else{
            res.render("comments/edit", {campground_id : req.params.id, comment : foundComment});
        }
    });
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;