const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');

const login_google = require("../resources/Middleware/google");
// const passport = require('passport')

const config = (app) => {
  app.use( express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser())
  app.use(express.static("public", {
    maxAge: "1d", // Cache trong 1 năm
    etag: false
}));
  login_google()


  
  // setup views for server using handlebars template
  app.set("views", [
    path.join(__dirname, "../resources/views/"),
  ]);
  app.set('view engine', 'ejs');
  
  // set static public folder
  app.use("/public", express.static(path.join(__dirname, "../public")));

  // setup session and cookie storage
  // const session = require("express-session");
  // app.use(
  //   session({
  //     secret: process.env.SECRET || "keyboard cat",
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 60000, secure: false },
  //   })
  // );

};

module.exports = config;
