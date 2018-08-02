var express = require("express"),
    User = require("../models/user"),
    passport = require("passport"),
    router = express.Router();

router.get("/", function(req, res) {
    res.render("landing");   
});

//registeration form
router.get("/register", function(req, res) {
   res.render("register"); 
});

//registration logic - save to db
router.post("/register", function(req, res) {
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds");
       });
   });
});

//LOGIN - form
router.get("/login", function(req, res) {
   res.render("login"); 
});

// authenticate login with db
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
    
});

//LOGOUT
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

//middleware for authenticating adding comments
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;