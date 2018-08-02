var mongoose = require("mongoose");

//create a schema for campgrounds
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
         }
      ]
});

//create a model from the schema
module.exports = mongoose.model("Campground", campgroundSchema);