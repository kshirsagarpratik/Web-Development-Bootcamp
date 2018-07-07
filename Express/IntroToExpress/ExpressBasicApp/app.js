//Import and initialise express.
var express = require("express");
var app = express();

//JS object that stores the sounds of animals.
var sounds = {
       pig: {
           sound: "'Oink! Oink!'"
       },
       
       cow: {
           sound: "'Moo!'"
       },
       
       dog: {
           sound: "'Woof! Woof!'"
       },
       
       kitty: {
           sound: "'Purr!'"
       },
       
       snek: {
           sound: "'Hiss!'"
       }
       
   };

// "/" visit
app.get("/", function(req, res) {
    res.send("Welcome to my assignment!");    
});

//visit '/speak/animal'
app.get("/speak/:animal", function(req, res) {
   console.log(req.params);
   var animal = req.params.animal.toLowerCase();
   if(sounds[animal]) {
       var sound = sounds[animal].sound;
       res.send("The " + animal + " says " + sound);
   }
  else {
      res.send("Sorry, page not found!... What are you doing with your life?!");
  }
});

// visit /repeat/word/number
app.get("/repeat/:word/:number", function(req, res) {
    console.warn(typeof req.params.number);
    var frequency = Number(req.params.number);
    if(!isNaN(frequency)) {
        var word = req.params.word;
        var returnString = "";
        for(var i = 0; i < frequency; i++) {
           returnString = returnString + " " + word;  
        }
        res.send(returnString);
    }
    
    else {
        res.send("Sorry, page not found!... What are you doing with your life?!");
    }
    
});

//visit any other route
app.get("*", function(req, res) {
    res.send("Sorry, page not found!... What are you doing with your life?!");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});
