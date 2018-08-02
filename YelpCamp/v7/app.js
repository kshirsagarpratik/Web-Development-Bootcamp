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
        
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

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

// requiring routes
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


//connect db
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

// seedDB(); //seeding the db

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server is up and running!");
});
