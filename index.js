const express = require("express");
const session = require("express-session");
const app = express();
const { Client } = require("pg");

app.use(
  session({
    secret: "ismt123",
    resave: false,
    saveUninitialized: true,
  })
);

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
  res.render("dashboard", { user: req.session.user });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/update", (req, res) => {
  res.render("update", { user: req.session.user });
});

app.post("/login", (req, res) => {
  client
    .query("select * from users where username = $1", [req.body.username])
    .then((res_db) => {
      if (res_db.rows.length === 0) return;
      if (res_db.rows[0].password === req.body.password) {
        req.session.user = res_db.rows[0];
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
  client
    .query("UPDATE users set email = $1, full_name=$2 where username=$3", [
      req.body.email,
      req.body.full_name,
      req.session.user.username,
    ])
    .then((res_db) => {
      req.session.user.email = req.body.email;
      req.session.user.full_name = req.body.full_name;
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, (req, res) => {
  console.log("Listening!!");
});
