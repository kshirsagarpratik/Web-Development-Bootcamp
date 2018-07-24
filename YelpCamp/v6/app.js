var express = require("express"),
 bodyParser = require('body-parser'),
 mongoose   = require("mongoose"),
 Campground = require("./models/campground"),
 Comment    = require("./models/comment"),
 seedDB     = require("./seed"),
 User       = require("./models/user"),
 passport   = require("passport"),
 LocalStrategy = require("passport-local"),
 expressSession = require("express-session"),
        app = express();
        
// APP CONFIG

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(expressSession({
    secret: "Josie is the best dog ever.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
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

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

// >>>>>>>>>>>>>AUTHENTICATION ROUTES<<<<<<<<<<<<<<<<<
//registeration form
app.get("/register", function(req, res) {
   res.render("register"); 
});

//registration logic
app.post("/register", function(req, res) {
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

//LOGIN
app.get("/login", function(req, res) {
   res.render("login"); 
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
    
});

//LOGOUT
app.get("/logout", function(req, res) {
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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server is up and running!");
});
