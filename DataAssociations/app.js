var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/data_associations", { useNewUrlParser: true });

var postSchema = mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

//create a user and create posts and then save them.

// var newUser = new User({
//     name: "Bender Bending Rodriguez",
//     email: "bender@futurama.co"
// });

// newUser.posts.push({
//     title: "Parrrtayy!",
//     content: "I have a bomb in me that'll explode if I stop!!!"
// });

// newUser.save(function(err, user){
//     if (err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });

User.findOne({name: "Bender Bending Rodriguez"}, function(err, user){
    if(err){
        console.log(err);
    } else{
        //add a new post and save the user
        user.posts.push({
            title: "Parrrtayy Can't Stop!",
            content: "I'm serious about the bomb!!!"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else{
                console.log(user);
                console.log("Bender is gonna blow!");
            }
        });
    }
});