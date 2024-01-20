const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Dashboard");
});

app.get("/login", (req, res) => {
  res.send("Welcome to login");
});

app.get("/register", (req, res) => {
  res.send("Welcome to Register");
});

app.get("/update", (req, res) => {
  res.send("Welcome to update");
});

app.post("/login", (req, res) => {
  res.send("login post");
});

app.post("/register", (req, res) => {
  res.send("register post");
});

app.post("/update", (req, res) => {
  res.send("update post");
});

app.listen(3000, (req, res) => {
  console.log("Listening!!");
});
