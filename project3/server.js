// 1. import expres library
// always import the library first
const express = require("express");
const parser = require('body-parser')
const urlEncoded = parser.urlencoded({extended: true})
const multer = require('multer')
const uploadProcessor = multer({dest: 'public/post-imgs/'})

// 2. initialize library
const app = express();

// 3. this trigger the middleware
app.use(express.static("public"));
app.use(urlEncoded)

// 3a. global variables for server storage
let allPosts = [];
let postNum = 0;

let suggPosts = [];

app.post('/upload', uploadProcessor.single('image'), (req, res)=>{
  console.log(req.body)
  
  let postData = {
    name: req.body.name,
    comment: req.body.comment,
    postNumber: postNum
  }

  if(req.file){
    postData.imgSrc = "/post-imgs/" +req.file.filename
  }

  console.log(postData)

  allPosts.unshift(postData)
  postNum++
  res.redirect('/posts.html')
})

app.get('/all-posts', (req, res)=>{
  res.json({posts: allPosts})
})



//  5. set app to listen for request
app.listen(3002, () => {
  console.log("server is running on http://127.0.0.1:3002/");
});

// initiate 'nodemon server.js' to auto refreseh server
