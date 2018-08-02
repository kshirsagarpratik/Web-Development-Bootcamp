var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

//create dummy data that is needed to fill the page.
//remove all existing campgrounds and comments.
//add new campgrounds and comments.
//export seedDB()

var data = [
        {
            name: "Cloud's Rest",
            image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            name: "Desert Mesa",
            image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            name: "Canyon Floor",
            image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ];

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Campgrounds have been deleted!");
            Comment.remove({}, function(err){
                if(err){
                    console.log(err);
                } else{
                   console.log("Comments have been deleted!");
                   data.forEach(function(seed){
                       Campground.create(seed, function(err, createdCampground){
                           if(err){
                               console.log(err);
                           } else{
                               console.log("Campground has been created!");
                               Comment.create({
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, createdComment){
                                if(err){
                                    console.log(err);
                                } else{
                                    console.log("Comment has been created!");
                                    createdCampground.comments.push(createdComment);
                                    createdCampground.save();
                                }
                            });
                           }
                       });
                   }); 
                }
            });
        }
    });
}

module.exports = seedDB;