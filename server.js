const express = require("express");
const app = express();
require("dotenv").config();
const router = express.Router();
const port = process.env.PORT || 5000;
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const db = mongoose.connection;
const host = process.env.CLUSTER;
const dbupdateobject = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

//////////////////////
//CONTROLLERS
///////////////////
const eventControl = require("./controllers/eventController.js");
const volControl = require("./controllers/volController.js");
const notesControl = require("./controllers/notesController.js");

/////////////////////
//DATABASE
/////////////////////

// Configuration
const mongoURI = host;

// Connect to Mongo
mongoose.connect(mongoURI, dbupdateobject);

// Connection Error/Success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));
db.on("open", () => {
  console.log("Connection made!");
});

//Schema
const Users = require("./models/users.js");

/////////////////////////
//RUNTIME DATA
/////////////////////////

/////////////////////
//MIDDLEWARE
/////////////////////
app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use("/events", eventControl);
app.use("/vol", volControl);
app.use("/notes", notesControl);

/////////////////////
//Listener
/////////////////////
app.listen(port, () => console.log(`Hello Alex I'm listening on ${port}!`));

/////////////////////
//User Route
/////////////////////
//user Route
app.get("/", (req, res) => {
  if (req.session) {
    if (req.session.login === true) {
      res.render("welcome.ejs");
    } else {
      res.render("main.ejs");
    }
  }
});

//create new user page
app.get("/new", (req, res) => {
  if (req.session) {
    if (req.session.login === true) {
      res.render("welcome.ejs");
    } else {
      res.render("newuser.ejs");
    }
  }
});

//login or signup error page
app.get("/error", (req, res) => res.render("error.ejs"));

//posting a new user
app.post("/new", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  Users.create(req.body, (error, createdUser) => {
    if (createdUser === undefined) {
      res.redirect("/error");
    } else {
      res.render("success.ejs");
    }
  });
});

//route to login page
app.get("/login", (req, res) => {
  if (req.session) {
    if (req.session.login === true) {
      res.render("welcome.ejs");
    } else {
      res.render("login.ejs");
    }
  }
});

//logout button
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
});

//confirm login set session data
app.post("/login", (req, res) => {
  Users.findOne({ username: req.body.username }, (error, user) => {
    if (user === null) {
      res.redirect("/error");
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.login = true;
        req.session.user = req.body.username;
        res.redirect("/");
      } else {
        res.redirect("/error");
      }
    }
  });
});

/////////////////////
//Static Files
/////////////////////
app.use(express.static("public"));
