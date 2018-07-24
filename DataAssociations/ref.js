var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/d_2", { useNewUrlParser: true });

// var postSchema = mongoose.Schema({
//     title: String,
//     content: String
// });

// var Post = mongoose.model("Post", postSchema);

// var userSchema = mongoose.Schema({
//     name: String,
//     email: String,
//     posts: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Post"
//         }
//     ]
// });

// var User = mongoose.model("User", userSchema);

// User.create({
//     email: "bob@gmai.com",
//     name: "Bob Belcher"
// });

// Post.create({
//     title: "Makin burgers 3",
//     content: "blah blah ala kazam bam bam"
// }, function(err, post){
//     if(err){
//         console.log(err);
//     }
//     else{
//         //console.log(post);
//         //find user, push into his posts array and then save.
//         User.findOne({email: "bob@gmai.com"}, function(err, user){
//             if(err){
//                 console.log(err);
//             } else{
//                 user.posts.push(post);
//                 user.save(function(err, user){
//                     if(err){
//                         console.log(err);
//                     } else{
//                         console.log(user);
//                     }
//                 });
//             }
//         });
//     }
// });

//find user and find all posts associated.
// User.findOne({email: "bob@gmai.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });

var Post = require("./models/Post.js");

var User = require("./models/User.js");