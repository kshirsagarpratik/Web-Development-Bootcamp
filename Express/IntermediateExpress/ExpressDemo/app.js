var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

//create homepage route
app.get("/", function(req,res) {
    res.render("home");
});

//create fallinlove: thing
app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing.toLowerCase();
    res.render("love", {thing: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
            {title: "First Post", author: "Colt"},
            {title: "Bananas are lyf!", author: "Susan"},
            {title: "OMG this is a pomsky!", author: "Danny"}
        ];
    res.render("posts", {posts: posts});
})

//server listens on..
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server up and running!");
});