//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-ren:alawai1@cluster0-9krl5.mongodb.net/blogDB",{useNewUrlParser: true});
const posts = [];


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Model
const postSchema = new mongoose.Schema({
  title: String,
  post:String
});

const Post = mongoose.model("Post",postSchema);



//   posts.forEach(function(post){
//   console.log("Match found ::"+post+":::post title"+post.postT);
//   if(requestedPost === _.lowerCase(post.postT)){
//   res.render("post",{
//     title: post.title,
//     detail:post.post
//   });
// }
  // const param = req.params.postTopic;
  // var a = param.replace(/-/g, " ");
  //  if(posts.some(post=> post.postT.toLowerCase() === a.toLowerCase())){
  // console.log(req.params.postTopic+" Match found");


app.get("/",function(req,res){
  console.log(__dirname+"/views/home.ejs");
  //page that you render has to be .ejs and inside the folder views and ejs recognises views folder

  Post.find({},function(err,posts){
    res.render("home",{
      homeContent: homeStartingContent,
      posts:posts

      // aboutContent: aboutContent,
      // contactContent:contactContent
    });
  });

      //console.log(posts)
  //render home.ejs or home both works
  //res.sendFile(__dirname+"/views/home.ejs");
});

app.get("/about",function(req,res){
  res.render("about",{
    AboutContent: aboutContent
  });
});


//when contact route is hit, show get to contact page and render
app.get("/contact",function(req,res){
res.render("contact",{
  ContactContent:contactContent
});
});
//get request to this route
app.get("/compose",function(req,res){
  res.render("compose");
});
//when somebody does the post request to this route
app.post("/compose", function(req, res){
  var inputTextPassed = req.body.inputText;
  console.log("In post of compose!"+inputTextPassed);
  //we will be storing it to pass to page so const
  const post =  {
    postT: req.body.inputText,
    postP: req.body.postBody
  };

  const inputPost = new Post({
    title: req.body.inputText,
    post: req.body.postBody
  });

  inputPost.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
  //posts.push(post);
  console.log(inputPost);

});


//individual post route
app.get("/posts/:id",function(req,res){
  console.log("HERE IS ID ::" +req.params.id);
  var postClicked = req.params.id;
console.log("after trim::::::"+postClicked);

  Post.findById(postClicked,function(err,post){
    if(!err){
      console.log("In render of post");
      res.render("post",{
        title: post.title,
        detail:post.post
      });
    }
  });
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
