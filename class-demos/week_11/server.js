const express = require("express");
const parser = require("body-parser");
const multer = require("multer");
const nedb = require("@seald-io/nedb");

const encodedParser = parser.urlencoded({ extended: true });
const upladProcessor = multer({ dest: "public/upload" });

// added database variable to keep track of database file
// "database" is using the nedb library to store all the info in the db to an external file
let database = new nedb({
  filename: "database.txt",
  autoload: true,
});

const app = express();

// app.use is midleware; happens in between set up and the routes that it receives
// create public folder
app.use(express.static("public"));
app.use(encodedParser);
// tells the app to be ready to receive json data
app.use(parser.json());

// set first route
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
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
  database.remove(query, {}, (err, numRemoved)=>{
    console.log(numRemoved)
    res.redirect('/')
  });
});

app.listen(6004, () => {
  console.log("app is running on http://127.0.0.1:6004");
});
