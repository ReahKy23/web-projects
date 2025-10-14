// import express library
// 1. we always import libraries first
const express = require("express");

//  2. initialize the libraries
const app = express();

// 3. trigger the middleware
// stuff that happens between initialization and app listen
// the static resources(html, css, js) get routes created, that way we dont
// have to create routes for them in step 4.
app.use(express.static("assets"));

// 3a. global variables for server storage
let allNotes = [];

// 4. routing
// this determines what responses the server gives based on what requests come in
// all our routes get written here
app.get("/", (request, response) => {
  response.send("server is working");
});


app.get("/submit", (request, response) => {
  console.log(request.query);

  // making local variables
  let user = request.query.guest; // grabs the guest from the form data name="guest"
  let message = request.query.note; // grabds the note from the form data name="note"
  let time = Date(Date.now()).toLocaleString(); // creates a new date string at the now time

  // creates a new object, storing all the new variable data inside of properties
  const messageData = {
    username: user,
    message: message,
    date: time,
  };

  allNotes.push(messageData);
  // response.send("thank you for submitting, " + user);
  // 
  response.redirect("/");
});

app.get("/all-messages", (req, res) => {
  let messageString = ""; // creates local variable string to use to send to client

  // use a loop to go through the entire notes array
  // shorthand for a regular for loop
  for (let n of allNotes) {
    messageString +=
      "<h3>" + n.username + "</h3>" + " says " + n.message + "<br />";
  }
  //   res.send(messageString);
  //   we are no longer sending a String, we are now sending a json object
  // it is cumbersome to have to write html as a string
  res.json({ notes: allNotes });
});

// 5. set teh app to listen to request
// ALWAYS GOES LAST
app.listen(3001, () => {
  // console.log of port where the server is running
  console.log("server running on http://127.0.0.1:3001/");
});
