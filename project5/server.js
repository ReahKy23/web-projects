const express = require("express");
const parser = require("body-parser");
const multer = require("multer");
const nedb = require("@seald-io/nedb");
const path = require("path");
const fs = require("fs");
// new library added
const bcrypt = require("bcrypt");
const expressSession = require("express-session");
const nedbSessionStore = require("nedb-promises-session-store");

const encodedParser = parser.urlencoded({ extended: true });
const upladProcessor = multer({ dest: "public/upload" });

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// added database variable to keep track of database file
// "database" is using the nedb library to store all the info in the db to an external file
let database = new nedb({
  filename: path.join(dataDir, "database.txt"),
  autoload: true,
});

let userdb = new nedb({
  filename: "userdb.txt",
  autoload: true,
});

// connect
const nedbSessionsInit = nedbSessionStore({
  connect: expressSession,
  filename: path.join(dataDir, "sessions.txt"),
});

const app = express();
const cookieParser = require("cookie-parser");
// tell app to use session
app.use(
  expressSession({
    store: nedbSessionsInit,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // login once per day before it expires again
    },
    secret: "supersecretcode123", //only allow my server to make changes to the session
    resave: false,
    saveUninitialized: false,
  })
);

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
  // Check if user is logged in
  if (req.session.loggedInUser) {
    // User is logged in, send them to user page
    res.sendFile("user.html", { root: "public" });
  } else {
    // Not logged in, show home page
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

    res.sendFile("user.html", { root: "public" });
  }
});


// // this whill take in data from my main.js and delete a specific post in the database
// app.delete("/delete-post", (req, res) => {
//   // console.log(req.body.id)
//   // based on nedb, we construct a search that will match the _id property inside of hte db that comes in from the client
//   let query = {
//     _id: req.body.id,
//   };

//   //   find ONE thing
//   database.remove(query, {}, (err, numRemoved) => {
//     console.log(numRemoved);
//     res.redirect("/");
//   });
// });

app.get("/visits", (req, res) => {
  res.json(req.cookies);
});



app.get("/account", (req, res) => {
  res.sendFile("user.html", { root: "public" });
});


app.post("/signup", async (req, res) => {
  try {
    console.log("Signup request received:", req.body);
    
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, 10);
    let newUser = {
      user: username,
      pass: password,
    };

    userdb.insert(newUser, ()=>{
      req.session.loggedInUser = username;
    res.redirect("/account");
    })
    
    // Auto-login the user after signup
    
  } catch (error) {
    console.error("Error creating user:", error);
    res.redirect("/account?error=signup");
  }
});

app.get("/login", (req, res) => {
  res.sendFile("user.html", { root: "public" });
});

app.post("/authenticate", async (req, res) => {
  try {
    let searchedUser = {
      user: req.body.username,
    };
    // findOne is searching the db for the user that is trying to login in
    // if the user is not found in the db it will be directed back to the login page
    const foundUser = await userdb.findOneAsync(searchedUser);
    
    if (!foundUser) {
      console.log("User not found:", req.body.username);
      res.redirect("/?error=usernotfound");
    } else {
      // if user found now check pswd
      // compareSync has two params: the pswd coming in from the body and the pswd in the db
      if (bcrypt.compareSync(req.body.password, foundUser.pass)) {
        let session = req.session; // retrieve the session that exists on the request
        session.loggedInUser = foundUser.user; // set the logged in user to be successful log in username
        console.log("✓ User logged in successfully:", foundUser.user);
        res.redirect("/account");
      } else {
        console.log("Invalid password for user:", req.body.username);
        res.redirect("/?error=invalidpassword");
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.redirect("/?error=true");
  }
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/");
  });
});

app.listen(6005, () => {
  console.log(" Server running on http://127.0.0.1:6005");
});