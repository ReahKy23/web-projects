const express = require("express");
const parser = require("body-parser");
const multer = require("multer");
const nedb = require("@seald-io/nedb");
// new library added
const bcrypt = require('bcrypt');
const expressSession = require('express-session')
const nedbSessionStore = require('nedb-promises-session-store')


const encodedParser = parser.urlencoded({ extended: true });
const upladProcessor = multer({ dest: "public/upload" });

// added database variable to keep track of database file
// "database" is using the nedb library to store all the info in the db to an external file
let database = new nedb({
  filename: "database.txt",
  autoload: true,
});

let userdb = new nedb({
  filename: 'userdb.txt',
  autoload: true
})

// connect
const nedbSessionsInit = nedbSessionStore({
  connect: expressSession,
  filename: 'sessions.txt'
})

const app = express();
const cookieParser = require("cookie-parser");
// tell app to use session
app.use(expressSession({
  store: nedbSessionsInit,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 // login once per day befor it expires again
  },
  secret: 'supersecretcode123' //only allow my server to make changes to the session
}))

// app.use is midleware; happens in between set up and the routes that it receives
// create public folder
app.use(express.static("public"));
app.use(encodedParser);
// tells the app to be ready to receive json data
app.use(parser.json());

// new added cookie parser middleware
// enables cookies to be tracked from the server
app.use(cookieParser());

// set first route
app.get("/", (req, res) => {
  // if statement to check if the cookie has been created
  // if it does not exist, then create it
  if (req.cookies.visits) {
    // convert string into a number
    // cookies automatically creates "visits": "1"
    let currentVisits = parseInt(req.cookies.visits);
    let addVisits = currentVisits + 1;
    let options = {
      expires: new Date(Date.now() + 10000000000000),
    };
    res.cookie("visits", addVisits, options);
  } else {
    // creates a cookie for the first time
    // takes in a couple different parameters
    // 1st param: name of key of cookie
    // 2nd param: value we assign that key to
    // 3rd param: options, this allows us to specify when the cookie expires
    // randomTime set to a day in milliseconds
    let randomTime = 1000 * 60 * 60 * 24;
    let options = {
      expires: new Date(Date.now() + randomTime),
    };
    res.cookie("visits", 1, options);
  }

  res.sendFile("home.html", { root: "public" });
});

app.post("/upload", upladProcessor.single("imgUpload"), (req, res) => {
  console.log(req.body);

  // creates an object that keeps track of the time using the Dat class from MDN
  const currentTime = new Date(Date.now());

  console.log(currentTime);
  let data = {
    postText: req.body.text,
    postTime: currentTime.toLocaleString(),
    postTimestamp: currentTime,
    likes: 0, //because we are adding a new propery in the database, the old database
    // items no longer work, so we need to empty our current db
  };

  //  2 params for insert()
  // 1. data to be added
  // 2. callback for after the data is added
  database.insert(data, (err, dataToBeAdded) => {
    if (err) {
      res.redirect("/");
    } else {
      console.log(dataToBeAdded);
      res.redirect("/");
    }
  });
});

// create a new request to retrieve the info from the database
app.get("/populate-posts", (req, res) => {
  // set up request to retrieve all information from the database
  // 1. what are we looking for inside the database; query = variable
  // nedb takes in an object to search for
  // empty {} means we want to retrieve the entire database
  let query = {};

  database.find(query, (err, data) => {
    console.log(data);
    res.json(data);
  });
});

// this whill take in data from my main.js and delete a specific post in the database
app.delete("/delete-post", (req, res) => {
  // console.log(req.body.id)
  // based on nedb, we construct a search that will match the _id property inside of hte db that comes in from the client
  let query = {
    _id: req.body.id,
  };

  //   find ONE thing
  database.remove(query, {}, (err, numRemoved) => {
    console.log(numRemoved);
    res.redirect("/");
  });
});

app.get("/visits", (req, res) => {
  res.json(req.cookies);
});

app.post("/like", (req, res) => {
  // using brakcet syntax like an array to retrieve this specific id for the cookie
  if (req.cookies[req.body.id]) {
    res.redirect("/");
  } else {
    res.cookie(req.body.id, "liked!", {
      expires: new Date(Date.now() + 10000000000),
    });

    let query = {
      _id: req.body.id,
    };
    let update = {
      // rules in which we are updating a particular item in the db
      // $inc increases a value by the specific property and amount => {property: amount}
      $inc: { likes: 1 },
    };
    database.update(query, update, {}, () => {
      res.redirect("/");
    });
  }
});

app.get('/register', (req, res)=>{
  res.sendFile('register.html', {root: 'public'})
})
app.post('/signup', (req, res)=>{
  let username = req.body.username
  let password = bcrypt.hashSync(req.body.password, 10)
  let newUser = {
    user: username,
    pass: password
  }
  
  userdb.insert(newUser, ()=>{
    res.redirect('/register')
  })
})

app.get('/login', (req, res)=>{
  res.sendFile('login.html', {root: 'public'})
})

app.post('/authenticate', (req, res)=>{
  let searchedUser = {
    user: req.body.username
  }
  // findOne is searching the db for the user that is trying to login in
  // if the user is not found in the db it will be directed back to the login page
  userdb.findOne(searchedUser, (err, foundUser)=>{
    if(err || foundUser == null){
      res.redirect('/login?user=notFound')
    } else{
      // if user found now check pswd
      // compareSync has two params: the pswd coming in from the body and the pswd in the db
      if(bcrypt.compareSync(req.body.password, foundUser.pass)){
        let session = req.session // retireve the session that exists on the request
        session.loggedInUser = foundUser.user // set the logged in user to be successful log in username
        res.redirect('/?login=sucess')
      }else{
        res.redirect('/login?password=invalid')
      }
    }

  })
})

app.listen(6004, () => {
  console.log("app is running on http://127.0.0.1:6004");
});
