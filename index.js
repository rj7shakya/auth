const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("dashboard");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/update", (req, res) => {
  res.render("update");
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
