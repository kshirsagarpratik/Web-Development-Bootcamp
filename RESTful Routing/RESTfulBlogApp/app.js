var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//connect mongoose
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true});

//set up schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

//set up model
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1507660392550-9aff6e04c7e5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=578a8d0b666f7dc52ab09a74e524464f&auto=format&fit=crop&w=934&q=80",
//     body: "This is a dummy blog post!"
// });

// RESTFUL ROUTES
//index redirect
app.get("/", function(req, res){
    res.redirect("/blogs");
});
//index
app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else{
           res.render("index", {blogs: blogs}); 
       }
   });
});

//new
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//create
app.post("/blogs", function(req, res){
    //save the object to db
    // req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, blog){
        if(err){
            console.log("omg err!");
        } else{
            console.log("yay no err");
            console.log(blog);
            res.redirect("/blogs");
        }
    });
});

//show
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        } else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//edit - form
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        } else{
            res.render("edit", {blog: foundBlog});
        }
    });
     
});

//update - put request
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log(err);
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    });   
});

//destroy - delete route
app.delete("/blogs/:id", function(req, res){
   Blog.findByIdAndRemove(req.params.id, function(err, removedBlog){
       if(err){
           console.log(err);
       } else{
           res.redirect("/blogs"); 
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running!");
});