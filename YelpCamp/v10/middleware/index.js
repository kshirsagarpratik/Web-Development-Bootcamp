var Comment = require("../models/comment"),
Campground  = require("../models/campground");

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
    //check if logged in
    if(req.isAuthenticated()){
        //findout the comment owner and match it with currentUser
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("/campgrounds/" + req.params.id);
            } else{
                if(foundComment.author.id.equals(req.user._id)){
                //if they are same then allow "next"
                 next();
                } else{
                    //else tell them they are not allowed this.
                    console.log("sneaky sneaky");
                    res.redirect("back");
                }
            }
        });
    } else{
        //else tell em to login.
        res.redirect("/login");
    }
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //if logged in 
    if(req.isAuthenticated()){
        //  if user id matched then show edit page, otherwise redirect somewhere
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            return res.redirect("/campgrounds");
        } else{
            //does user own campground?
            console.log(req.user._id);
            console.log(foundCampground.author.id);
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else{
                res.redirect("back");
            }
        }
    });
    } else{
        // else redirect to log in
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = middlewareObj;