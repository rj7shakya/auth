const express = require("express");
const app = express();
const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "ismt",
  password: "inspiron",
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log("Database Connected Sucessfully!!!");
  }
});

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
  client
    .query("select * from users where username = $1", [req.body.username])
    .then((res_db) => {
      if (res_db.rows.length === 0) return;
      if (res_db.rows[0].password === req.body.password) {
        return res.redirect("/");
      }
    })
    .catch((err) => console.log("err", err));
});

app.post("/register", (req, res) => {
  client
    .query(
      "insert into users(username,password,email,full_name) values ($1,$2,$3,$4)",
      [req.body.username, req.body.password, req.body.email, req.body.full_name]
    )
    .then(() => res.redirect("/login"))
    .catch((err) => console.log("err", err));
});

app.post("/update", (req, res) => {
  res.send("update post");
});

app.listen(3000, (req, res) => {
  console.log("Listening!!");
});
