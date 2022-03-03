const express = require("express");
var request = require("request");
const sendMail = require("./mail.js");
require("dotenv").config();

const app = express();

// Access pubic folder
app.use(express.static('public'));

// Parse HTML forms
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Template engine
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submitForm", (req, res) => {
  const { email, name, message } = req.body;

  sendMail(email, name, message, function(err, data) {
    if (err) res.render("index", {success: false, message: "Error: Internal error "});
    else res.render("index", {success: true, message: "Success: Email was sent"});
  }); 
   
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port${PORT}`);
});