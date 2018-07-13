var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//add new cats to db

// var george = new Cat({
//     name: "Ms Norris",
//     age: "7",
//     temperament: "Evil"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong");
//     } else {
//         console.log("We just saved a cat!");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "Snow White",
    age: "6",
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

//retrieve cats from db

Cat.find({}, function(err, cats){
    if(err){
        console.log("OH NO, ERROR!");
        console.log(err);
    }  else {
        console.log("All the cats!");
        console.log(cats);
    }
})