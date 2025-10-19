// import expres library
// always import the library first
const express = require("express");

// initialize library
const app = express();

// this trigger the middleware
app.use(express.static("assets"));

// set routing
app.get("/", (req, res) => {
  res.send("server is working");
});



//  set app to listen for request
app.listen(3002, () => {
  console.log("server is running on http://127.0.0.1:3002/");
});

// initiate 'nodemon server.js' to auto refreseh server