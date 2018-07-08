var express = require("express");
var request = require("request");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
})

app.get("/results", function(req, res) {
    var url = 'http://www.omdbapi.com/?s=' + req.query.search + '&apikey=thewdb';
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            var parsedData = JSON.parse(body);
            res.render("results", {parsedData: parsedData});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie App has started!");
});