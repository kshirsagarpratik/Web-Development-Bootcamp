var express = require("express");
var app = express();

// '/' -> "hi there"
// '/bye' -> "goodbye"
// '/dog' -> "MEOW!"

app.get("/", function(req, res) {
    res.send("Hi there!");
    console.log("SOMEONE SENT A GET REQUEST TO /");
});

app.get("/bye", function(req, res) {
    res.send("Goodbye!");
    console.log("SOMEONE SENT A GET REQUEST TO /BYE");
});

app.get("/dog", function(req, res) {
    res.send("MEOW!");
    console.log("SOMEONE SENT A GET REQUESTS TO /DOG");
    
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has strarted!!");
});