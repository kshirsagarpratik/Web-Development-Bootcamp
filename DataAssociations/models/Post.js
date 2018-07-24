var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
   title: String,
   content: String
});

module.export = mongoose.model("Post", postSchema);