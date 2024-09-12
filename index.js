// Necessary Imports
import express from "express";
import bodyParser from "body-parser";

// Constants
const app = express();
const port = 3001;

// Variables
var blogPostArray = [];

// EJS & BodyParser
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded( {extended: true} ));

// BLOG POST BLOCK
// ===================================================
// Blog Post Handle
app.get("/", (req, res) => { 
   res.render("index.ejs", { blogPostArray }) 
});

// Updating the Blog Array
app.post("/new-post", (req, res) => {

   // Retrieve Data
   var title = req.body.title;
   var content = req.body.content;
   var author = req.body.author;

   // Create the Post
   var newPost = { title, content, author, time: new Date() };

   // Update and Redirect User
   blogPostArray.push(newPost);
   res.redirect("/");
});
// ===================================================

// EDIT BLOCK
// ===================================================

// Edit Page Handle
app.get("/edit/:id", (req, res) => {
   // Get the posts position
   var postID = req.params.id;
   var blogPost = blogPostArray[postID];
   
   // Render The Post
   res.render("edit", { blogPost: blogPost, postID: postID });
});

// Update the Edits
app.post( "/edit/:id", (req, res) => {

   var postID = req.params.id;

   // Update Array with Edited Post
   blogPostArray[postID] = {
      title: req.body.title, content: req.body.content, 
      author: req.body.author, time: blogPostArray[postID].time
   }

   res.redirect("/");
});

// ===================================================

// Handle Deleting
app.post("/delete/:id", (req, res) => {
   var postID = req.params.id;

   delete blogPostArray[postID];

   res.redirect("/")
});

// Basic Listening for Console
app.listen(port, () => {
   console.log(`Server running on port ${port}.`)})
