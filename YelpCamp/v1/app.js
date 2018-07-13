var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image:"https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_1280.jpg"},
        {name: "Granite Hill", image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_1280.jpg"},
        {name: "Mount Goat's Rest", image:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_1280.jpg"},
        {name: "Salmon Creek", image:"https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_1280.jpg"},
        {name: "Granite Hill", image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_1280.jpg"},
        {name: "Mount Goat's Rest", image:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_1280.jpg"},
        {name: "Salmon Creek", image:"https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_1280.jpg"},
        {name: "Granite Hill", image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_1280.jpg"},
        {name: "Mount Goat's Rest", image:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_1280.jpg"}
];

app.get("/", function(req, res) {
    res.render("landing");   
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //create new campground from obtained data.
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(re, res){
    //render form page.
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server is up and running!");
});