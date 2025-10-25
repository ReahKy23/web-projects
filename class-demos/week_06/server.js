// npm install express body-parser multer

// import libraries
const express = require('express')
// so that we have out default data inside of our browser
const parser = require('body-parser')
const urlEncoded = parser.urlencoded({extended: true})
const multer = require('multer')
const uploadProcessor = multer({dest: 'public/images/'})

// intializing the express applicaton 
const app = express()

// set the middleware (of the stuff that happens in between initialization and listening)
// this specific line makes our entire folder "/public" accessible to the web
app.use(express.static('public'))
// need middleware so that, using the library, it will automatically look at what is coming in from the browser
//what we are using today is a url-encoded form which the library lets us look at
app.use(urlEncoded)


// global array in our server to store all of the posts
let allPosts = []

// global variable that stores what number post we have
let postNum = 0;

app.get('/',(req,res)=>{
    //cahnge the default route
    res.sendFile('home.html', {root: 'public'})
})

// handle the post request coming in from the html file
// the ".post" has to make the method post in the html file
app.post('/upload', uploadProcessor.single('theimage'), (req, res)=>{
    console.log(req.body)
    // instead of retrieving things from the query, 
    // post requests stores data coming in from the request body (stores in the body instead of query like in get method)
    // pulls from teh declared "name" attribute
    let postData = {
        title: req.body.title,
        caption: req.body.caption,
        postNumber: postNum
    }
    
    //check to see if there is a file to be uploaded
    if(req.file){
        postData.imgSrc = "/images/" + req.file.filename
    }

    console.log(postData)
    // adding individual post data to global data array
    // .push adds to the end of the array
    // allPosts.push(postData)
    // .unshift adds to the  beginning of the array
    allPosts.unshift(postData)

    // incrementing the post number
    postNum++

    // once it goes through the storing the data, it will send a redirect back to main site
    // once we have stored the data refresh to home page
    res.redirect('/')

})

app.get('/all-posts', (req, res)=>{
    res.json({posts: allPosts})
})
app.listen(6001,()=>{
    console.log('server is running at http://127.0.0.1:6001')
})